// backend/middleware/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
// This middleware allows us to write our route handlers as async functions and 
// automatically catches any errors, passing them to the next middleware (which
//  is typically our error handler). This keeps our code clean and avoids repetitive try-catch blocks in every controller function.
module.exports = asyncHandler;
