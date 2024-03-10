import { Label } from "./label";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The value of the label.",
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: ({ value }) => <Label>{value}</Label>,
  args: {
    value: "Base Label",
  },
};
