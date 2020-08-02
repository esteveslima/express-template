const winston = require('./winston');

const daoFileLogger = winston.loggers.get('daoFileLogger');

// Logging Dao
const logDaoFunction = ({ functionName, parameters, functionResult }) => {
  if (process.env.NODE_ENV !== 'production' || process.env.LOGGING !== 'true') return;

  const functionText = {
    name: functionName,
    parameters: JSON.stringify(parameters),
    result: JSON.stringify(functionResult).length > 50
      ? `${JSON.stringify(functionResult).slice(0, 50)}...`
      : JSON.stringify(functionResult),
  };
  const message = `
      Dao access: [ ${functionText.name}( ${functionText.parameters} ) ].
      Result: [ ${functionText.result} ].`;
  const logMessage = message.replace(/(\r\n|\n|\r)/gm, '');
  daoFileLogger.info(logMessage);
};

// Get function parameters names
const getParamNames = (func) => {
  const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
  const ARGUMENT_NAMES = /([^\s,]+)/g;
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) { result = []; }
  return result;
};

//

/*
  Monkey-patch IFFE using apply() made ONLY to simplify wrapping all functions for logging purposes.
  Without using it, every traced function has to add a logger individually
*/
exports.wrapDaoLogger = (tracedFunctions) => {
  const tracedFunctionsObject = tracedFunctions;

  Object.keys(tracedFunctionsObject).forEach((functionName) => {
    tracedFunctionsObject[functionName] = (function wrapTraced(tracedFunction) {
      return async function traced() {
        const parametersNames = getParamNames(tracedFunction);
        const parametersValues = Object.values(arguments);
        const parameters = {};
        parametersNames.forEach((name, index) => { parameters[name] = parametersValues[index]; });

        const functionResult = await tracedFunction.apply(this, arguments);

        logDaoFunction({ functionName, parameters, functionResult });

        return functionResult;
      };
    }(tracedFunctionsObject[functionName]));
  });
};
