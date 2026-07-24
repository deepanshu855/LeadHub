import config from "../config/config.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  const response = {
    success: false,
    message: err.message || "Internal server error",
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  if (config.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
