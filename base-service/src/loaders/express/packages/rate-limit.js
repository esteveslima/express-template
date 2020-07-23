const rateLimit = require('express-rate-limit');

module.exports.setupRateLimit = () => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res /* , next */) => {
      res.status(429).send('Too many requests');
    },
  });
  return limiter;
};
