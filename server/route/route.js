const express = require("express")
const router = express.Router()
const {SignUpUser,loginUser, verifyUser} = require("../controller/registerController")


router.route("/register").post(SignUpUser)
router.route("/login").post(loginUser)

// for getting the user data for profile
router.route("/user-data/:id").get(verifyUser)




module.exports = router