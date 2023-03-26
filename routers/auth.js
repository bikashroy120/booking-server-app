const express = require("express")
const { regester, login, sentOtp, varyfyOtp, changePassword, getallUser, getProfileData, updateProfileData } = require("../controllor/auth")
const { authMiddleware } = require("../middlewarer/authMiddlewarer");

const router = express.Router()


router.post("/",regester)
router.post("/login",login)
router.post("/send-otp",sentOtp)
router.post("/otp-verify",varyfyOtp)
router.post("/change-password",changePassword)
router.get("/",authMiddleware,getallUser)
router.get("/profile-data",authMiddleware,getProfileData)
router.patch("/update",authMiddleware,updateProfileData)


module.exports = router