module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
          prettierConfig: { printWidth: 80, singleQuote: false }
        },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        }
      }
    }
  ]
}