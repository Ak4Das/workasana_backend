require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")
const reportRoutes = require("./routes/reports")
const teamRoutes = require("./routes/teams")
const projectRoutes = require("./routes/projects")
const tagRoutes = require("./routes/tags")
const userRoutes = require("./routes/users")

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
