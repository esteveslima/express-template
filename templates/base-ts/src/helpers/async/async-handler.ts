// Wrap async functions to DRY code and handle Errors(controllers and some middlewares)
export default (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
