const express= require("express")
const router = express.Router();

const { userDetails } = require("../Controllers/userDetails");
const { sendSms } = require("../Controllers/otpVerification");
const { signUp, login } = require("../Controllers/auth");
const { authen, havePermit } = require("../Middleware/authen");


router.post("/signup", signUp)
router.post("/login", login)

router.post("/adduserdetails", userDetails );
router.get("/protected", authen,havePermit)
router.post("/sendsms", sendSms)


module.exports = router;