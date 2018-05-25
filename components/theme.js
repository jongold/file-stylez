import { theme as defaultTheme } from 'rebass';

const colors = {
  base: '#282c34',
  mono: ['#abb2bf', '#818896', '#5c6370'],
  hue: [
    '#56b6c2',
    '#61aeee',
    '#c678dd',
    '#98c379',
    '#e06c75',
    '#be5046',
    '#d19a66',
    '#e6c07b',
  ],
};

const fonts = {
  ...defaultTheme.fonts,
  sans: '"Roboto Mono", monospace',
};

const theme = {
  ...defaultTheme,
  fonts,
  colors,
};

export default theme;
