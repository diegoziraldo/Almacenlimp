





















































'use strict'

var express=require('express')
var bodyParser = require('body-parser')

var app = express();


var user_routes=require('./routes/user')
var product_routes=require('./routes/product')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());



app.use('/user',user_routes)
app.use('/product',product_routes)







module.exports=app;





























// /* PARA INICIAR EL SERVIDOR: 'npm run dev' */

// const express = require('express');
// const app = express();

// app.get('/',(req, res) => {
//     res.send('Holaas')
// })

// app.get('/login',(req, res) => {
//     res.send('Aqui va el login')
// })
// app.get('/productos',(req, res) => {
//     res.send('Aqui van los productos')
// })
// app.get('/promos',(req, res) => {
//     res.send('Aqui van las promos')
// })
// app.get('/pedido',(req, res) => {
//     res.send('Aqui va el pedido')
// })




// app.get('/*',(req, res) => {
//     res.send('Archivo no encontrado')
// })




// app.listen(3000, ()=>{
//     console.log('FUNCIONA');
// })