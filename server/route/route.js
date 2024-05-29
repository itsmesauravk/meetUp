const express = require("express")
const router = express.Router()
const {SignUpUser,loginUser} = require("../controller/registerController")


router.route("/register").post(SignUpUser)
router.route("/login").post(loginUser)


module.exports = router