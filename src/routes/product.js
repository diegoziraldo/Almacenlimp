'use strict'

var express=require('express')
var multipart=require('connect-multiparty')

var ProductController=require('../controlador/product')
var api=express.Router();

var md_upload = multipart({uploadDir:'./src/upload/product'})
var md_auth = require('../middleware/auth')


api.post('/saveProduct',ProductController.saveProduct)
api.get('/getAllProduct/:page?',ProductController.getAllProduct)
api.post('/saveImage',md_upload,ProductController.uploadImage)


module.exports=api