const Nutrients = {
  fat: {
    light: '#ffe582',
    dark: '#ffd433',
  },
  carbohydrate: {
    light: '#ff9999',
    dark: '#ff3f3f',
  },
  protein: {
    light: '#99f1ff',
    dark: '#3fafff',
  },
  ethanol: {
    light: '#82ff84',
    dark: '#35ff38',
  },
};

const Colours = {
  primary: {
    standard: '#23232e',
    dark: '#141418',
  },
  secondary: {
    standard: 'rgb(4, 42, 75)',
  },
};

const Text = {
  primary: '#b6b6b6',
  secondary: {
    standard: '#df49a6',
    alternative: '#4958df',
  },
  tertiary: {
    standard: '#ff7eee',
    alternative: '#8b7eff',
  },
  title: {
    primary: 'black',
    secondary: 'grey',
  },
};

const Background = {
  primary: '#fff',
  secondary: 'beige',
};

const Success = {
  primary: 'rgb(17, 218, 17)',
  secondary: 'rgb(0, 117, 0)',
};

const Error = {
  primary: 'tomato',
  secondary: 'rgb(117, 20, 3)',
};

const Border = {
  primary: '0.1rem solid lightgrey',
  secondary: `0.1rem solid ${Background.primary}`,
};

const Shadow = {
  primary: 'rgba(0, 0, 0, 0.2)',
  secondary: 'rgba(0, 0, 0, 0.3)',
};

const Transition = {
  primary: '200ms',
};

export {
  Nutrients,
  Colours,
  Text,
  Background,
  Success,
  Error,
  Border,
  Shadow,
  Transition,
};
