const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

const router = new express.Router()

// register - post
router.post('/register',userController.registerController)

// login - post
router.post('/login',userController.loginController)

// get all users
router.get('/allusers',jwtMiddleware,userController.getAllUserController)

// get the current user 
router.get('/currentuser',jwtMiddleware,userController.getTheCurrentUserController)


module.exports = router