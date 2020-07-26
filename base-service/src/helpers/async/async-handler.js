// Wrap async functions to DRY code and handle Errors(controllers and some middlewares)
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
