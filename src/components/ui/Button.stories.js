import { Button } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "select" },
      description: "The variant of the button.",
      defaultValue: "default",
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
      description: "The size of the button.",
      defaultValue: "default",
    },
    label: {
      control: "text",
      description: "The label of the button.",
    },
    disabled: {
      control: "boolean",
      description: "The disabled state of the button.",
      defaultValue: false,
    },
    asChild: {
      control: "boolean",
      description: "The asChild prop of the button.",
      defaultValue: false,
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: ({ variant, size, label, disabled, asChild }) => (
    <Button variant={variant} size={size} disabled={disabled} asChild={asChild}>
      {label}
    </Button>
  ),
  args: {
    label: "Base Button",
    variant: "default",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Destructive = {
  render: ({ variant, size, label, disabled, asChild }) => (
    <Button variant={variant} size={size} disabled={disabled} asChild={asChild}>
      {label}
    </Button>
  ),
  args: {
    label: "Destructive Button",
    variant: "destructive",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Outline = {
  render: ({ variant, size, label, disabled, asChild }) => (
    <Button variant={variant} size={size} disabled={disabled} asChild={asChild}>
      {label}
    </Button>
  ),
  args: {
    label: "Outline Button",
    variant: "outline",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Secondary = {
  render: ({ variant, size, label, disabled, asChild }) => (
    <Button variant={variant} size={size} disabled={disabled} asChild={asChild}>
      {label}
    </Button>
  ),
  args: {
    label: "Secondary Button",
    variant: "secondary",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Ghost = {
  render: ({ variant, size, label, disabled, asChild }) => (
    <Button variant={variant} size={size} disabled={disabled} asChild={asChild}>
      {label}
    </Button>
  ),
  args: {
    label: "Ghost Button",
    variant: "ghost",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Link = {
  render: ({ variant, size, label, disabled, asChild }) => (
    <Button variant={variant} size={size} disabled={disabled} asChild={asChild}>
      {label}
    </Button>
  ),
  args: {
    label: "Link Button",
    variant: "link",
    size: "default",
    disabled: false,
    asChild: false,
  },
};
