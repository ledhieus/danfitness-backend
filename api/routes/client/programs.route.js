const express = require("express")
const router = express.Router()

const controller = require("../../controllers/client/programs.controller")
const authMiddleware = require("../../middlewares/auth.middlewares")

router.get("/", controller.index)
router.get("/detail/:slug", controller.detail)
router.get("/detail-private/:id", authMiddleware.requireAuth, controller.detailProgramPrivate)

module.exports = router