// React
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CSSTransition } from "react-transition-group";

// Styling
import "./AuditorioGoldaForm.css";

// Libraries
import emailjs from "emailjs-com";

export type AuditorioGoldaFormProps = {
    serviceId: string;
    templateId: string;
    userId: string;
};

export type AuditorioFormValues = {
    name: string;
    email: string;
    event_desc: string;
};

const checkEmailValid = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ["", null, undefined].includes(email) ? false : regex.test(email);
};

const AuditorioGoldaForm = (props: AuditorioGoldaFormProps) => {
    const { serviceId, templateId, userId } = props;

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<AuditorioFormValues>({
        name: "",
        email: "",
        event_desc: "",
    });

    console.log(39, isFormFilled);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let tempFormValues: AuditorioFormValues = { ...formValues, [event.target.name]: event.target.value };

        setFormValues(tempFormValues);
        setIsFormFilled(!!tempFormValues.email && !!tempFormValues.name && checkEmailValid(formValues.email));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (isFormFilled) {
            emailjs
                .send(serviceId, templateId, formValues as unknown as Record<string, unknown>, userId)
                .then(
                    (result) => {
                        console.log(result.text);
                        setIsModalOpen(true);
                        setTimeout(() => {
                            setIsModalOpen(false);
                        }, 2000);
                    },
                    (error) => {
                        console.error(error.text);
                    }
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} id="auditorioGoldaForm">
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                className="interaction"
                onChange={handleInputChange}
                required
            ></input>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Correo"
                className="interaction"
                onChange={handleInputChange}
                required
            />
            <textarea
                id="event_desc"
                name="event_desc"
                placeholder="¡Cuéntanos sobre tu evento!"
                className="interaction"
                onChange={handleInputChange}
            />
            <button type="submit" className="sendButton">
                Enviar
            </button>
            <CSSTransition in={isModalOpen} timeout={500} classNames="vanish" unmountOnExit>
                <div id="formSucceededMessage">
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.02367 0.432L9.19967 6.608L15.3437 0.464C15.4794 0.319548 15.6429 0.203991 15.8243 0.12426C16.0058 0.0445277 16.2015 0.00226295 16.3997 0C16.824 0 17.231 0.168571 17.531 0.468629C17.8311 0.768687 17.9997 1.17565 17.9997 1.6C18.0034 1.79616 17.967 1.99102 17.8927 2.17261C17.8184 2.3542 17.7078 2.5187 17.5677 2.656L11.3437 8.8L17.5677 15.024C17.8314 15.282 17.986 15.6313 17.9997 16C17.9997 16.4243 17.8311 16.8313 17.531 17.1314C17.231 17.4314 16.824 17.6 16.3997 17.6C16.1958 17.6085 15.9923 17.5744 15.8023 17.5001C15.6122 17.4257 15.4397 17.3126 15.2957 17.168L9.19967 10.992L3.03967 17.152C2.90448 17.2916 2.74298 17.4031 2.56448 17.48C2.38598 17.5569 2.19402 17.5977 1.99967 17.6C1.57533 17.6 1.16836 17.4314 0.868304 17.1314C0.568245 16.8313 0.399674 16.4243 0.399674 16C0.395944 15.8038 0.432339 15.609 0.506626 15.4274C0.580914 15.2458 0.691526 15.0813 0.831674 14.944L7.05567 8.8L0.831674 2.576C0.56797 2.31801 0.413338 1.96866 0.399674 1.6C0.399674 1.17565 0.568245 0.768687 0.868304 0.468629C1.16836 0.168571 1.57533 0 1.99967 0C2.38367 0.0048 2.75167 0.16 3.02367 0.432Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <h3>¡Gracias!</h3>
                    <p>
                        Tu mensaje se ha enviado correctamente, alguien de nuestro equipo se pondrá en
                        contacto contigo lo antes posible.
                    </p>
                </div>
            </CSSTransition>
        </form>
    );
};

export default AuditorioGoldaForm;
