const helmet = require('helmet');

exports.setupHelmet = () => {
  const helmetOptions = {
    hsts: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self", "'unsafe-inline'", "'unsafe-eval'"],
      },
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
  };

  return helmet(helmetOptions);
};
