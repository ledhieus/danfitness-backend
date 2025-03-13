const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/user.controller")

router.get("/detail/:id", controller.detail)
router.get("/", controller.index)
router.post("/create", controller.create)
router.patch("/edit/:id", controller.edit)
router.patch("/deleted/:id", controller.edit)

module.exports = router