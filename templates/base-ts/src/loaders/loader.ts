import * as dotenv from '../services/env/dotenv';
import expressLoader from './express/express';

export default async () => {
  // Envirnoment Variables
  dotenv.setupDotenv();

  // Load Express with its packages
  const expressApp = expressLoader();

  // Another loads...

  return expressApp;
};
