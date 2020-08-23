import stackTrace from 'stack-trace';

export const lastErrorTrace = (err) => {
// Last error trace
  const lastTrace = stackTrace.parse(err)[0];

  return lastTrace;
};
