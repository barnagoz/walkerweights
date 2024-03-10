import Footer from "./footer";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "COMMON/Footer",
  component: Footer,
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base = {
  render: () => <Footer />,
  args: {},
};
