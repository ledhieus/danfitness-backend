const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/exercisesList.controller")

router.post("/create", controller.create)
router.get("/", controller.index)
router.get("/detail/:id", controller.detail)
router.patch("/edit/:id", controller.edit)

module.exports = router