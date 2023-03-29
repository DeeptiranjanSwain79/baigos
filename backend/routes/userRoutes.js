const express = require('express');
const { registerUser, loginUser, updatePassword } = require('../controllers/userController');
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/update").put(updatePassword);

module.exports = router;