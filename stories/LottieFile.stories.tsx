import React from "react";
import { LottieFile, LottieFileProps } from "../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/LottieFile",
  component: LottieFile,
  argTypes: {},
} as ComponentMeta<typeof LottieFile>;

const Template: ComponentStory<typeof LottieFile> = (
  args : LottieFileProps
) => <LottieFile {...args}/>;

export const Main = Template.bind({});
Main.args = {
    fileName: 'example.json',
    width: '200px',
    height: '600px'
}