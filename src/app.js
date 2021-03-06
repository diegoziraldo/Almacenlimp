
'use strict'

var express=require('express')
var bodyParser = require('body-parser')

var app = express();
var path = require('path');


var user_routes=require('./routes/user')
var product_routes=require('./routes/product')
var categoria_routes=require('./routes/categorias')

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.use('/user',user_routes)
app.use('/product',product_routes)
app.use('/categorias',categoria_routes)
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/controlador/vistas/home.html'));
})







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