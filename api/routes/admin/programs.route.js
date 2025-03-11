const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/programs.controller")

router.get("/", controller.index)
router.get("/detail-admin/:id", controller.detailAdmin)
router.post("/create", controller.create)
router.patch("/edit/:id", controller.edit)



//client
router.get("/detail/:slug", controller.detail)

module.exports = router