const winston = require('winston');

const { format } = winston;
const { combine, label, json } = format;

// Path considering project root
const errorsLogPath = 'src/resources/logs/errors.log';

winston.loggers.add('errorsFileLogger', {
  format: combine(
    label({ label: 'errorsFileLogger' }),
    json(),
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: errorsLogPath,
    }),
  ],
});

winston.loggers.add('errorsConsoleLogger', {
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new winston.transports.Console({
      level: 'error',
    }),
  ],
});

module.exports = winston;
