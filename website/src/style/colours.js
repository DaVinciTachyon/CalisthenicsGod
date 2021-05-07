const Nutrients = {
  fat: {
    light: '#ffe582',
    dark: '#ffd433',
  },
  carbohydrate: {
    light: '#ff3f3f',
    dark: '#ff9999',
  },
  protein: {
    light: '#3fafff',
    dark: '#99f1ff',
  },
  ethanol: {
    light: '#35ff38',
    dark: '#82ff84',
  },
};

const General = {
  primary: {
    standard: '#23232e',
    dark: '#141418',
  },
  secondary: {
    standard: 'rgb(4, 42, 75)',
  },
};

const Title = {
  primary: 'black',
  secondary: 'grey',
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

export {
  Nutrients,
  General,
  Title,
  Text,
  Background,
  Success,
  Error,
  Border,
  Shadow,
};

export default General;
