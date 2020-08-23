import cors from 'cors';

export const setupCors = () => {
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  return cors(corsOptions);
};
