import React from "react";
import { VideoScrollProps, VideoScroll } from "../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/VideoScroll",
  component: VideoScroll,
  argTypes: {},
} as ComponentMeta<typeof VideoScroll>;

const Template: ComponentStory<typeof VideoScroll> = (
  args : VideoScrollProps
) => <VideoScroll {...args}/>;

export const Main = Template.bind({});
Main.args = {
    video: "https://file.notion.so/f/f/ebe45e49-06f7-4e3d-a9d0-4d2e237b91e3/db455fb6-c503-46d7-981f-059b4097760b/230913_Story_1_-_Internet_Users.mp4?id=d737fe03-878c-427d-b03b-7275ada26b33&table=block&spaceId=ebe45e49-06f7-4e3d-a9d0-4d2e237b91e3&expirationTimestamp=1695009600000&signature=QN_vXbGnbdV12dfh-7lJmyn39mQkDThHnqZ7vgZELtc",
    width: 800
}