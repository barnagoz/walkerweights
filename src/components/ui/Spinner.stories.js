import { LoadingSpinner } from "./spinner";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "UI/Spinner",
  component: LoadingSpinner,
  description: "A custom loading spinner.",
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: () => <LoadingSpinner />,
  args: {},
};
