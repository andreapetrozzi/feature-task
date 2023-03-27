import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Pie, { prepareSlices } from "./Pie";

export default {
  title: "Components/Pie",
  component: Pie,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Pie>;

const Template: ComponentStory<typeof Pie> = (args) => (
  <div style={{ width: "400px", height: "400px" }}>
    <Pie {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  count: 873,
  slices: prepareSlices([
    { color: "yellow", amount: 4 },
    { color: "green", amount: 9 },
    { color: "purple", amount: 12 },
    { color: "blue", amount: 30 },
  ]),
};
