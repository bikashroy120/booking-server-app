const express = require("express")
const { regester, login } = require("../controllor/auth")

const router = express.Router()


router.post("/",regester)
router.post("/login",login)


module.exports = router