import jwt from "jsonwebtoken"
import { BadRequestError, NotFoundError } from "../utils/customErrorHandler.js"

export default function (req, res, next) {
  const authHeader = req.header("Authorization")
  if (!authHeader) {
    throw new BadRequestError(
      "Access Denied: Missing authentication JWT token.",
    )
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    throw new NotFoundError("Access Denied: Token not present in header.")
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    next(error)
  }
}
