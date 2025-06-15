const chalk = require('chalk');

const logger = {
  info: (message, ...args) => {
    console.log(chalk.blue('INFO:'), message, ...args);
  },
  warn: (message, ...args) => {
    console.log(chalk.yellow('WARN:'), message, ...args);
  },
  error: (message, ...args) => {
    console.error(chalk.red('ERROR:'), message, ...args);
  },
  success: (message, ...args) => {
    console.log(chalk.green('SUCCESS:'), message, ...args);
  }
};

module.exports = logger;

// Example usage:
// const logger = require('./utils/logger');

// logger.info('This is an informational message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');
// logger.success('This is a success message.');