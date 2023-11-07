import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // Handle Invalid Mongoose ID Error

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  // Handle Validation Error

  if (err.name === "ValidatorError") {
    const message = Object.values(err.erros).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Handle Mongoose Dubplicate key Error

  if (err.code === 11000) {
    const message = `Duplicate: ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 404);
  }

  // Handle wrong JWT Error

  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. try again !!`;
    error = new ErrorHandler(message, 404);
  }

  // Handle expired JWT Error

  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. try again !!`;
    error = new ErrorHandler(message, 404);
  }

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }


  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
