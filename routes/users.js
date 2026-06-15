const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middleware/auth")

router.get("/", auth, async (req, res) => {
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
})

module.exports = router
