/* PARA INICIAR EL SERVIDOR: 'npm run dev' */

const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.send('Holaas')
})

app.get('/login',(req, res) => {
    res.send('Aqui va el login')
})
app.get('/productos',(req, res) => {
    res.send('Aqui van los productos')
})
app.get('/promos',(req, res) => {
    res.send('Aqui van las promos')
})
app.get('/pedido',(req, res) => {
    res.send('Aqui va el pedido')
})




app.get('/*',(req, res) => {
    res.send('Archivo no encontrado')
})




app.listen(3000, ()=>{
    console.log('FUNCIONA');
})