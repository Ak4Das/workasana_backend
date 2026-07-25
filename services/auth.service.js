import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { NotFoundError, ValidationError } from "../utils/customErrorHandler.js"

export const signupService = async (req, res) => {
  try {
    const { name, email, password, role = "Team Contributor" } = req.body
    let userExists = await User.findOne({ email })

    if (userExists) {
      throw new ValidationError("This email is already active.")
    }

    const user = new User({ name, email, password, role })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    throw error
  }
}

export const loginService = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      throw new NotFoundError("User not found.")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new ValidationError("Invalid Password.")
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    throw error
  }
}

export const fetchMeService = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      throw new NotFoundError("User profile not found.")
    }
    res.status(200)
    res.json({
      success: true,
      message: "user fetched successfully",
      respondedData: user,
    })
  } catch (error) {
    throw error
  }
}
