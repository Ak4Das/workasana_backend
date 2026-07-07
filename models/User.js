import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true },
)

// Register middleware that executes before "save" operation
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) { // "this" points to document being saved
    return next()
  }
  const salt = await bcrypt.genSalt(10) // A salt is random data added to a password before hashing (Here 10 is the cost factor)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export default mongoose.model("User", UserSchema)
