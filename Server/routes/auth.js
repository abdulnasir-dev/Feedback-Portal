const express = require('express');
const {body} =require('express-validator');
const router = express.Router();
const authController=require('../controller/authController');


router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("Name required"),
        body("email").isEmail().withMessage("Valid email required"),
        body("password").isLength({min:6}).withMessage("password min 6 chars"),
    ],
    authController.signup
);

router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").exists(),
    ],
    authController.login
);

module.exports=router;  