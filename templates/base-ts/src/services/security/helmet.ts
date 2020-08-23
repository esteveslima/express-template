import helmet from 'helmet';

export const setupHelmet = () : typeof helmet => {
  const helmetOptions = {
    hsts: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"/* , 'https://onlinebanking.jumbobank.com' */],
        scriptSrc: ["'self", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
      },
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
  };

  return helmet(helmetOptions);
};
