const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../../../docs')], // You can specify directories
        },
        loaderOptions: {
          injectStoryParameters: false,
          prettierConfig: { printWidth: 80, singleQuote: false }
        }
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        }
      }
    },
    '@storybook/addon-a11y'
  ]
}