const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

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
  const morganFormat = '[:date[iso]] - :status - ":method :url HTTP/:http-version" - :remote-addr - :remote-user - :total-time ms';
  const morganOptions = {
    stream: fs.createWriteStream(path.join(__dirname, '../../../resources/logs/requests.log'), { flags: 'a' }),
  };
  return morgan(morganFormat, morganOptions);
};
