const dotenv = require('dotenv');

exports.setupDotenv = () => {
  dotenv.config({ path: `${__dirname}/./../../config/.env` });
};
