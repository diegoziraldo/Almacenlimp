'use strict'

var express=require('express')
var UserController=require('../controlador/user')

var api=express.Router();
var md_auth = require('../middleware/auth')

api.post('/register',UserController.saveUser)
api.post('/login',UserController.loginUser)


module.exports=api