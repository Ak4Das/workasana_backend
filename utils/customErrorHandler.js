export class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR", details = null) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.details = details
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details) {
    super(message, 400, "BAD_REQUEST", details)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found", details) {
    super(message, 400, "NOT_FOUND", details)
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details) {
    super(message, 400, "VALIDATION_ERROR", details)
  }
}