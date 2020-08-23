import hpp from 'hpp';

export const setupHpp = () : typeof hpp => {
  const whitelist = [];
  return hpp(whitelist);
};
