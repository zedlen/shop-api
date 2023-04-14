import chalk from 'chalk'

const chalky = (message, theme) => {
  return chalk`{${theme.join('.')} ${message}}`;
};

export default chalky
