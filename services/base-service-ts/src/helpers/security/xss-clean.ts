import xssClean from 'xss-clean';

export const setupXssClean = () : typeof xssClean => {
  const xss = xssClean();
  return xss;
};
