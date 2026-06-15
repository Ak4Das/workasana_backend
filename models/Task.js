const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    owners: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    timeToComplete: { type: Number, required: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Blocked"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["High", "Low"],
      default: "High",
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Task", TaskSchema)
