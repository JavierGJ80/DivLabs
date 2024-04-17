import React from "react";
import { AuditorioGoldaForm, AuditorioGoldaFormProps } from "../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "Components/AuditorioGoldaForm",
    component: AuditorioGoldaForm,
    argTypes: {},
} as ComponentMeta<typeof AuditorioGoldaForm>;

const Template: ComponentStory<typeof AuditorioGoldaForm> = (args: AuditorioGoldaFormProps) => (
    <AuditorioGoldaForm {...args} />
);

export const Main = Template.bind({});
Main.args = {
    serviceId: "service_v75payg",
    templateId: "template_hpu9xst",
    userId: "m2VFvx_GPj6PVWj1h",
    recaptchaSiteKey: "6LeH5owoAAAAAC7hj-0JF1FOt60MYvyRWz-V6qr-",
};
