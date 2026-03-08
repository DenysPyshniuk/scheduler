const path = require("path");

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.js"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, "../src"),
      ...config.resolve.modules,
    ];
    return config;
  },
};

export default config;
