const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error("Global Error:", err);
// Send error response
  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
