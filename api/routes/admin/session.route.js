const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/session.controller")

router.get("/detail/:id", controller.detail)
router.patch("/edit/:id", controller.edit)
router.post("/create", controller.create)
router.get("/:id", controller.index)

module.exports = router