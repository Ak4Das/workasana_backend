const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Blocked"],
      default: "To Do",
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Project", ProjectSchema)
