export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'padded',
  options: {
    storySort : {
      order : ['Crispr', ['Introduction', 'Form Components', 'Form Layouts', 'Form Validations', 'Dynamic Properties']]
    }
  }
}