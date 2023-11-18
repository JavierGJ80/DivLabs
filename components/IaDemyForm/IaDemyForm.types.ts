export interface IaDemyFormProps {
    serviceId: string;
    templateId: string;
    userId: string;
    recaptchaSiteKey: string;
}

export interface FormValues {
  email: string;
  captcha: string | null;
}