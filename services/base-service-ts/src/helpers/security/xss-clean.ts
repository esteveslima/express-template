import xssClean from 'xss-clean';

export const setupXssClean = () => {
  const xss = xssClean();
  return xss;
};
