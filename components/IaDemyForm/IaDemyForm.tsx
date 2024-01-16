import "./IaDemyForm.css";
import emailjs from 'emailjs-com';
import React, { FormEvent, useState, ChangeEvent, createRef, InvalidEvent } from "react";
import { IaDemyFormProps, FormValues } from "./IaDemyForm.types";
import ReCAPTCHA from "react-google-recaptcha";
import { CSSTransition } from "react-transition-group";

const checkFormFilled = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (['', null, undefined].includes(email)? false : regex.test(email));
}

const IaDemyForm = (props: IaDemyFormProps) => {
    const { serviceId, templateId, userId, recaptchaSiteKey } = props;
    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [isCaptchaCompleted, setIsCaptchaCompleted] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const recaptchaRef = createRef<ReCAPTCHA>();
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        captcha: null,
    });

    const handleExpired = () => {
        setTimeout(() => {
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
        }, 200);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
        });

        setIsFormFilled(checkFormFilled(formValues.email));
    };

    const handleCaptchaChange = (value: string | null) => {
        setFormValues({
        ...formValues,
        captcha: value,
        });

        setIsCaptchaCompleted(!!value);
        setIsFormFilled(checkFormFilled(formValues.email));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (formValues.captcha) {
            emailjs.send(serviceId, templateId, formValues as unknown as Record<string, unknown>, userId)
            .then((result) => {
                console.log(result.text);
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                },1000)
            }, (error) => {
                console.error(error.text);
            });
        }
    };

    const closeModal = (e: FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
        },1000)
    };

    const modalStyle = {
        overlay: {
            backgroundColor: "rgb(20 20 20 / 81%)",
            zIndex: 99
        },
        content: {
            background: "#41464F",
            height: '15%',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '70%',
            margin: 'auto',
            borderRadius: `10px`,
            border: `1px solid #30363D`,
            color: 'white',
            zIndex: 99
        },
    };

    return(
        <form onSubmit={handleSubmit} id="IaDemyForm">
            <div id="formContainer">
                <input type="email" name="email" placeholder="E-mail" onChange={handleInputChange} className="emailInput" required />
                <input type="submit" value="Suscríbete" className={"sendButton"}/>
                <CSSTransition
                    in={isModalOpen}
                    timeout={500}
                    classNames="vanish"
                    unmountOnExit
                >
                    <span id="formSucceededMessage">Ahora estás suscrito</span>
                </CSSTransition>
            </div>
            <span id="receiveNotifications">¿Te gustaría recibir noticias, recursos y actualizaciones?</span>
            <ReCAPTCHA theme="dark" sitekey={recaptchaSiteKey} ref={recaptchaRef} onChange={handleCaptchaChange} onExpired={handleExpired} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px'}} />
        </form>
    );
};

export default IaDemyForm;