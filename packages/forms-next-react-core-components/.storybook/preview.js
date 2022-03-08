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
      order : ['Adaptive Form', ['Introduction', 'Components', ["Text Input Field", "Checkbox", "Radio Group", "Drop Down", "File Upload", "Button", "Panel"],
        'Layouts', 'Validations', 'Dynamic Properties']]
    }
  }
}