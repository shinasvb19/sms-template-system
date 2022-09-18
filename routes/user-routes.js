const express = require('express');
const { check } = require('express-validator');
const userController = require("../controllers/user-controller");
const router = express.Router();
router.get('/signup', userController.signupPage);
router.post('/signup', userController.signup);
module.exports = router;