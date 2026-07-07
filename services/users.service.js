import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const fetchUsersService = async (req, res) => {
  try {
    const users = await User.find().select("name email").sort({ name: 1 })

    res.status(200)
    res.json({
      success: true,
      message: "Users fetched successfully",
      respondedData: users,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProfileService = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id)
    if (!userProfile) {
      return res.status(400).json({ error: "User profile not found." })
    }

    if (req.body.name) {
      userProfile.name = req.body.name.trim()
    }

    if (req.body.newPassword) {
      const matchesCurrent = await bcrypt.compare(
        req.body.currentPassword,
        userProfile.password,
      )
      if (!matchesCurrent) {
        return res.status(400).json({
          error: "The provided active validation password is invalid.",
        })
      }

      userProfile.password = req.body.newPassword
    }

    const response = await userProfile.save()
    res.status(200)
    res.json({
      success: true,
      message: "User profile edited successfully.",
      respondedData: response,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
