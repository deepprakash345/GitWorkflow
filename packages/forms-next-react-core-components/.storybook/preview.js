export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort : {
      order : ['Form JSON', ['Properties', ['name', 'label', 'description', 'viewType', 'enum', "*"]],'*']
    }
  }
}