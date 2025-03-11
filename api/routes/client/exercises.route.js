const express = require("express")
const router = express.Router()
const privateMiddleware = require("../../middlewares/private.middlewares")
const controller = require("../../controllers/client/exercises.controller")

// router.get("/", controller.index)
router.get("/:id",privateMiddleware.requireAuth, controller.index)
router.get("/detail/:id", controller.detail)

module.exports = router