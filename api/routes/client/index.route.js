const programsRouter = require("./programs.route")
const sessionRouter = require("./session.route")
const exercisesRouter = require("./exercises.route")
const userRouter = require("./user.route")

module.exports = (app) => {
  app.use("/api/client/program", programsRouter)
  app.use("/api/client/session", sessionRouter)
  app.use("/api/client/exercises", exercisesRouter)
  app.use("/api/client/user", userRouter)
}