const express = require('express');
const authController = require('../controller/authController');
const route = express.Router();
const { verifyToken, verifyUser, verifyAdmin } = require('../verify_token');

route.post('/register', authController.register)
route.post('/registerUserByAdmin', authController.registerUserByAdmin)
route.post('/login', authController.login)
// route.post('/logout', authController.logout)

module.exports = route;    