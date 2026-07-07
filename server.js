import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"

import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import reportRoutes from "./routes/reports.js"
import teamRoutes from "./routes/teams.js"
import projectRoutes from "./routes/projects.js"
import tagRoutes from "./routes/tags.js"
import userRoutes from "./routes/users.js"

// Create Server
const app = express()
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  }),
)
app.use(express.json())

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/report", reportRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tags", tagRoutes)
app.use("/api/users", userRoutes)

// Start Server
async function startServer() {
  try {
    await connectDB()
    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}
startServer()
