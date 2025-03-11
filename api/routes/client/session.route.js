const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/session.controller")

router.get("/detail/:id", controller.detail)
router.get("/:id", controller.index)

module.exports = router