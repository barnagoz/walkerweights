import {Badge} from "./badge";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: "UI/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            options: [
                "default",
                "destructive",
                "outline",
                "secondary"
            ],
            control: {type: "select"},
            description: "The variant of the Badge.",
            defaultValue: "default",
        },
        label: {
            control: "text",
            description: "The label of the Badge.",
        },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
    render: ({variant, label,}) => (
        <Badge variant={variant}>
            {label}
        </Badge>
    ),
    args: {
        label: "Base Badge",
        variant: "default",
    },
};

export const Destructive = {
    render: ({variant, label,}) => (
        <Badge variant={variant}>
            {label}
        </Badge>
    ),
    args: {
        label: "Destructive Badge",
        variant: "destructive",
    },
};

export const Outline = {
    render: ({variant, label,}) => (
        <Badge variant={variant}>
            {label}
        </Badge>
    ),
    args: {
        label: "Outline Badge",
        variant: "outline",
    },
};

export const Secondary = {
    render: ({variant, label,}) => (
        <Badge variant={variant}>
            {label}
        </Badge>
    ),
    args: {
        label: "Secondary Badge",
        variant: "secondary",
    },
};