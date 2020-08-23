const cors = require('cors');

exports.setupCors = () => {
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  return cors(corsOptions);
};
