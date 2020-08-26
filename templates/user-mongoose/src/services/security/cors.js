const cors = require('cors');

exports.setupCors = () => {
  const corsOptions = {
    origin: '*', // replace it with the domains that are permitted to access the responses in the browser
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  return cors(corsOptions);
};
