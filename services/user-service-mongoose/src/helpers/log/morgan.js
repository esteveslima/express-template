const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const requestsLogPath = path.join(__dirname, '../../../resources/logs/requests.log');

exports.setupMorgan = () => {
  // Logging in console only for development
  if (process.env.NODE_ENV === 'development') {
    return morgan('dev');
  }
  // For production
  // If not logging, return nothing
  if (process.env.LOGGING !== 'true') {
    return (req, res, next) => { next(); };
  }
  // if logging, save to file
  const morganFormat = '[:date[iso]]\t:status\t:remote-addr - :remote-user\t:total-time ms\t:method :url HTTP/:http-version';
  const morganOptions = {
    stream: fs.createWriteStream(requestsLogPath, { flags: 'a' }),
  };
  return morgan(morganFormat, morganOptions);
};
