const express = require("express")
const router = express.Router()

const controller = require("../../controllers/client/user.controller")
const authMiddleware = require("../../middlewares/auth.middlewares")

router.get("/detail/:id", controller.detail)
router.post("/login", controller.login)
router.get("/me", authMiddleware.requireAuth, controller.getMe)
router.post("/logout", authMiddleware.requireAuth, controller.logout)
router.patch("/change-password", authMiddleware.requireAuth, controller.changePassword)

module.exports = router