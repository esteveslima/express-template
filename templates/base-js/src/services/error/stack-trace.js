const stackTrace = require('stack-trace');

exports.lastErrorTrace = (err) => {
// Last error trace
  const lastTrace = stackTrace.parse(err)[0];

  return lastTrace;
};
