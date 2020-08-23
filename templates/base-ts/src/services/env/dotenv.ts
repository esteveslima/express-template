import * as dotenv from 'dotenv';

export const setupDotenv = () : void => {
  dotenv.config({ path: `${__dirname}/./../../../config/.env` });
};
