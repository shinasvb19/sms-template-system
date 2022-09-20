const express = require('express');
const { check } = require('express-validator');
const userController = require("../controllers/user-controller");
const auth = require("../utils/auth")
const router = express.Router();

router.get('/signup', userController.signupPage);
router.get('/signin', userController.signPage);
router.post('/signup', userController.signup);
router.post('/signin', userController.login);
router.use(auth);
router.get('/admin', userController.adminPage);
router.get('/user', userController.userPage);
router.get('/logout', userController.userLogout);
router.delete('/:uid', userController.userDelete);
router.post('/edit', userController.userUpdate);
router.put('/update/:uid', userController.findUpdate);
// router.get('/search', userController.search);
router.post('/search', userController.searchPage);
module.exports = router;