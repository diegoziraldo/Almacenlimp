'use strict'

var express=require('express')
var UserController=require('../controlador/user')

var api=express.Router();
var md_auth = require('../middleware/auth')

api.post('/register',UserController.saveUser)
api.post('/login',UserController.loginUser)
api.get('/getLoginUser',UserController.getLoginUser)
api.get('/getRegisterUser',UserController.getRegisterUser)


module.exports=api