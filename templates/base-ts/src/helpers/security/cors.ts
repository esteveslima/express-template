import cors from 'cors';

export const setupCors = () : typeof cors => {
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  return cors(corsOptions);
};
