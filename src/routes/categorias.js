'use strict'

var express=require('express')
var multipart=require('connect-multiparty')

var CategoriaController=require('../controlador/categ')
var api=express.Router();

var md_upload = multipart({uploadDir:'./src/imagenes'})
var md_auth = require('../middleware/auth')


api.post('/saveCategory',CategoriaController.saveCategory)
api.get('/getCategory',CategoriaController.traerCategorias)


module.exports=api