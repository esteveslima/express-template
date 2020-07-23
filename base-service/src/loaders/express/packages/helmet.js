const helmet = require('helmet');

exports.setupHelmet = () => {
  const helmetOptions = {
    hsts: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
      },
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
  };

  return helmet(helmetOptions);
};
