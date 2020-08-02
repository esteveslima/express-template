const winston = require('winston');

const { format } = winston;
const { combine, label, json } = format;

// Path considering project root
const logPath = 'src/resources/logs';
const daoLogPath = `${logPath}/dao.log`;
const errorsLogPath = `${logPath}/errors.log`;

winston.loggers.add('daoFileLogger', {
  format: combine(
    json(),
    format.timestamp(),
    // format.printf((info) => `\n${info.timestamp} : ${info.level} : ${info.message}`),
    format.printf((info) => JSON.stringify({
      timestamp: info.timestamp,
      message: info.message,
    })),
  ),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: daoLogPath,
    }),
  ],
});

winston.loggers.add('errorsFileLogger', {
  format: combine(
    json(),
    format.timestamp(),
    // format.printf((info) => `\n${info.timestamp} : ${info.level} : ${info.message}`),
    format.printf((info) => JSON.stringify({
      timestamp: info.timestamp,
      message: info.message,
    })),
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
    format.colorize({
      all: true,
      colors: {
        info: 'blue',
        warning: 'yellow',
        error: 'red',
      },
    }),
    format.timestamp(),
    format.printf((info) => `${info.level} : ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      level: 'error',
    }),
  ],
});

module.exports = winston;
