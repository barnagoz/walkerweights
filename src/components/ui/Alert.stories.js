import { Alert, AlertTitle, AlertDescription } from "./alert";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title of the alert.",
    },
    description: {
      control: "text",
      description: "The description of the alert.",
    },
    variant: {
      options: ["default", "destructive"],
      control: { type: "select" },
      description: "The variant of the alert.",
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: ({ title, description, variant }) => (
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  ),
  args: {
    title: "Base Alert",
    description:
      "This is a base alert. It is used to inform the user of a non-destructive action.",
    variant: "default",
  },
};

export const Destructive = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Destructive Alert</AlertTitle>
      <AlertDescription>
        This is a destructive alert. It is used to warn the user of a
        destructive action.
      </AlertDescription>
    </Alert>
  ),
  args: {},
};
