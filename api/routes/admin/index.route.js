const programsRouter = require("./programs.route")
const sessionRouter = require("./session.route")
const exercisesRouter = require("./exercises.route")
const exercisesListRouter = require("./exercisesList.route")
const userRouter = require("./user.route")

module.exports = (app) => {
  app.use("/api/admin/program", programsRouter)
  app.use("/api/admin/session", sessionRouter)
  app.use("/api/admin/exercises", exercisesRouter)
  app.use("/api/admin/exercises-list", exercisesListRouter)
  app.use("/api/admin/user", userRouter)
}