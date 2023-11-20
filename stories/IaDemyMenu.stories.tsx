import React from "react";
import { IaDemyMenu, IaDemyMenuProps } from "../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/IaDemyMenu",
  component: IaDemyMenu,
  argTypes: {},
} as ComponentMeta<typeof IaDemyMenu>;

const Template: ComponentStory<typeof IaDemyMenu> = (
  args : IaDemyMenuProps
) => <IaDemyMenu {...args}/>;

export const Main = Template.bind({});