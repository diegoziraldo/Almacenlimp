'use strict'

var Product=require('../modelos/productos');
var moment=require('moment')
var mongoosePaginate = require('mongoose-pagination');
var fs =require('fs');
var path=require('path');

function saveProductGet(req,res){
    res.sendFile(path.join(__dirname+'/vistas/cargaProductos.html'));
}
function getProduct(req,res){
    res.sendFile(path.join(__dirname+'/vistas/listaProductos.html'));
}
function saveProduct(req ,res){
    var product=new Product();
    var params=req.body;
    if(params.name &&params.description && params.price && params.number && params.categoria){
        product.name=params.name;
        product.description=params.description;
        product.price=params.price;
        product.number=params.number;   
        product.category=params.categoria;
        product.createAt=moment().unix();
        product.eliminado=false;
        product.image=null;

        product.save((err,productStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar el producto'})
            
            if(productStored){
                res.sendFile(path.join(__dirname+'/vistas/listaProductos.html'));
                console.log('producto guardado')
            }else{
                res.status(404).send({message:'No se ha guardado el producto'})
            }
        })
    }else{
        
        res.sendFile(path.join(__dirname+'/vistas/Error.html'));
    }
}

function getAllProduct(req,res){

    var page=1;

    if(req.params.page){
        page=req.params.page;
    }
    var itemsPerPage=25;
    Product.find({ eliminado: {$ne:true}}).sort('_id').paginate(page,itemsPerPage,(err,product,total)=>{
        if(err) return res.status(200).send({message:'Error en la peticion'})
        if(!product) return res.status(404).send({message:'No hay productos para mostrar'});

        return res.status(200).send({
            product,
            total,
            pages:Math.ceil(total/itemsPerPage)
            
        })

    })
}
function getProductById(req,res){
        var prodId=req.body.id;
    Product.findById((prodId),(err,product)=>{
        if(err) return res.status(200).send({message:'Error en la peticion'})
        if(!product) return res.status(404).send({message:'No hay productos para mostrar'});

        return res.status(200).send({product:product})
    })
}
function uploadImage(req,res){
    console.log(req.body.productId)
    var productid=req.body.productId
    if(req.files){
        var file_path=req.files.image.path;
        console.log(file_path)
        var file_split=file_path.split('/');
        console.log(file_split)
        var file_name=file_split[2];
        console.log(file_name)
        var ext_split=file_name.split('.');
        console.log(ext_split)
        var file_ext=ext_split[1]

        if(file_ext == 'png' || file_ext=='jpg'|| file_ext=='jpeg' ||file_ext == 'gif'){
               Product.findByIdAndUpdate(productid,{image:file_name},{new:true},(err,productUpdated)=>{
                   if(err) return res.status(500).send({message:'Erro en la peticion'})

                   if(!productUpdated) return res.status(404).send({message:'No se ha podido Actualizar'})

                    return res.status(200).send({product:productUpdated})
               })
        }else{
            removeFilesOfUploads(res,file_path,'La extencion no es valida')
           
        }
    }else{
        return res.status(200).send({message:'No se han subido archivos'})
    }
}

function getImageFile(req,res){
    var imageFile= req.params.imageFile;
    var pathFile='./src/imagenes/'+imageFile

    fs.exists(pathFile,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile))
        }else{
            res.status(400).send({message:'El archivo no fue encotrado'})
        }
    })
}
function eliminarProducto(req,res){
    var idProduct=req.body.id;
    Product.findByIdAndUpdate(idProduct,{eliminado:true},{new:true},(err,userUpdated)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(!userUpdated) return res.status(404).send({message:'No se ha podido eliminar el usuario'})
        return res.status(200).send({result:"ok"})
        //res.sendFile(path.join(__dirname+'/vistas/listaProductos.html'));
    })
}
function editarProducto(req,res){
    var idProduct=req.body.productId;
    var product=req.body;
console.log(idProduct)
console.log(product)
    delete product.password;
    Product.findByIdAndUpdate(idProduct,product,{new:true},(err,userUpdated)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(!userUpdated) return res.status(404).send({message:'No se ha podido editar el usuario'})
        // return res.status(200).send({result:userUpdated})
        res.sendFile(path.join(__dirname+'/vistas/listaProductos.html'));
    })
}
function removeFilesOfUploads(res,file_path,message){
    fs.unlink(file_path,(err)=>{
        return res.status(200).send({message:message})
    })
}
module.exports={
    saveProduct,
    uploadImage,
    getAllProduct,
    getImageFile,
    saveProductGet,
    getProduct,
    eliminarProducto,
    getProductById,
    editarProducto
}

