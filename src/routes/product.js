'use strict'

var express=require('express')
var multipart=require('connect-multiparty')

var ProductController=require('../controlador/product')
var api=express.Router();

var md_upload = multipart({uploadDir:'./src/imagenes'})
var md_auth = require('../middleware/auth')

api.get('/saveProduct',ProductController.saveProductGet)
api.post('/saveProduct',ProductController.saveProduct)
api.get('/listProduct',ProductController.getProduct)
api.get('/getAllProduct/:page?/:cant?',ProductController.getAllProduct)
api.post('/saveImage',md_upload,ProductController.uploadImage)
api.get('/getImageFile/:imageFile',ProductController.getImageFile)
api.post('/deleteProduct',ProductController.eliminarProducto)
api.post('/getProduct',ProductController.getProductById)
api.post('/editProduct',ProductController.editarProducto)


module.exports=api