import mongoose from "mongoose"

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

export default mongoose.model("Project", ProjectSchema)
