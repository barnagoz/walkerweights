import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
      description: "The orientation of the carousel.",
      defaultValue: "horizontal",
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: ({ orientation }) => (
    <Carousel orientation={orientation} className="m-10 w-[80%]">
      <CarouselPrevious>Previous</CarouselPrevious>
      <CarouselContent>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
      </CarouselContent>
      <CarouselNext>Next</CarouselNext>
    </Carousel>
  ),
};
