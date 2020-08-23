import asyncHandler from './async-handler';

/*
  Function made ONLY to simplify wrapping all functions, which consume promises, in asyncHandler.
  Without using it, every async controller/middleware function has to be wrapped in asyncHandler
  individually or try block with catch calling next(which is error-handler middleware).
  Wrap when server starts, at runtime.
*/
export const wrapAsyncFunctions = (asyncFunctions: object) : void => {
  const asyncFunctionsObject : object = asyncFunctions;
  Object.keys(asyncFunctionsObject).forEach((functionName) => {
    asyncFunctionsObject[functionName] = asyncHandler(asyncFunctions[functionName]);
  });
};
