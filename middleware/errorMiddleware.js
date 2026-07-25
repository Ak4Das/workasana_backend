import { AppError } from "../utils/customErrorHandler.js"

export const globalErrorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development"

  isDev && console.error(err)

  // For Known error
  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      code: err.code,
      details: isDev ? err.details : null,
    })
  }

  // For Unknown error
  return res.status(500).json({
    success: false,
    code: "INTERNAL_ERROR",
    message: err.message,
  })
}
