import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = res.statusCode || 500;

  res.status(statusCode);

  res.json({
    status: statusCode,
    message: err.message,
  });
};
