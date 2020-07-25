// Wrap async functions to DRY code and handle Errors(controllers and some middlewares)
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Find a way to apply this to every function exported within a file(controllers and middlewares)
// to get a bit more DRY code
