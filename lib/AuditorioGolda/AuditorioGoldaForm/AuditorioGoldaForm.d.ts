import React from "react";
import "./AuditorioGoldaForm.css";
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
declare const AuditorioGoldaForm: (props: AuditorioGoldaFormProps) => React.JSX.Element;
export default AuditorioGoldaForm;
