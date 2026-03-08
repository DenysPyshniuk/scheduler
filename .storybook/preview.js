import "../src/index.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#222f3e" },
        { name: "white", value: "#fff" },
      ],
    },
  },
};

export default preview;
