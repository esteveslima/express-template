import stackTrace from 'stack-trace';

export const lastErrorTrace = (err) : any => {
// Last error trace
  const lastTrace : any = stackTrace.parse(err)[0];

  return lastTrace;
};
