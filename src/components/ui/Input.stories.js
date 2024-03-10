import { Input } from "./input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "The placeholder of the input.",
    },
    variant: {
      options: [
        "text",
        "email",
        "phone",
        "file",
        "password",
        "number",
        "date",
        "time",
        "color",
        "range",
        "checkbox",
        "radio",
      ],
      control: { type: "select" },
      description: "The variant of the input.",
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Placeholder",
    variant: "text",
  },
};

export const Email = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Email",
    variant: "email",
  },
};

export const Phone = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Phone",
    variant: "phone",
  },
};

export const File = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "File ",
    variant: "file",
  },
};

export const Password = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Password",
    variant: "password",
  },
};

export const Number = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Number",
    variant: "number",
  },
};

export const Date = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Date",
    variant: "date",
  },
};

export const Time = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Time",
    variant: "time",
  },
};

export const Color = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Color",
    variant: "color",
  },
};

export const Range = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Range",
    variant: "range",
  },
};

export const Checkbox = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Checkbox",
    variant: "checkbox",
  },
};

export const Radio = {
  render: ({ variant, placeholder }) => (
    <Input placeholder={placeholder} type={variant} />
  ),
  args: {
    placeholder: "Radio",
    variant: "radio",
  },
};
