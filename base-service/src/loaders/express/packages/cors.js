const cors = require('cors');

exports.setupCors = () => {
  const corsOptions = {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
  };
  return cors(corsOptions);
};
