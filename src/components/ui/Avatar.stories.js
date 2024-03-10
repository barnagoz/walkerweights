import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    img_src: {
      control: "text",
      description: "The source of the image.",
    },
    img_alt: {
      control: "text",
      description: "The alt text of the image.",
    },
    fallback: {
      control: "text",
      description: "The fallback text, usually consisting of an acronym.",
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: ({ img_src, img_alt, fallback }) => (
    <Avatar>
      <AvatarImage src={img_src} alt={img_alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
  args: {},
};
