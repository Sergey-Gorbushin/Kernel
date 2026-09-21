import '../src/styles/global.css';

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'design-system',
      values: [{ name: 'design-system', value: '#f9f9f8' }],
    },
    options: {
      storySort: {
        order: ['Design System', ['Typography', 'Buttons', 'Inputs', 'Textarea', 'Select', 'Dropdown', 'Checkbox & Radio', 'Pagination']],
      },
    },
  },
};

export default preview;
