'use strict'

var Product=require('../modelos/productos');
var moment=require('moment')
var mongoosePaginate = require('mongoose-pagination');
var fs =require('fs');
var path=require('path')

function saveProduct(req ,res){
    var product=new Product();
    var params=req.body;

    product.name=params.name;
    product.description=params.description;
    product.price=params.price;
    product.number=params.number;   //borrar
    product.createAt=moment().unix();
    product.image=null;

    product.save((err,productStored)=>{
        if(err) return res.status(500).send({message:'Error al guardar el producto'})

        if(productStored){
            res.status(200).send({product:productStored})
            console.log('producto guardado')
        }else{
            res.status(404).send({message:'No se ha guardado el producto'})
        }
    })
}
function getAllProduct(req,res){

    var page=1;

    if(req.params.page){
        page=req.params.page;
    }
    var itemsPerPage=5;
    Product.find().sort('_id').paginate(page,itemsPerPage,(err,product,total)=>{
        if(err) return res.status(200).send({message:'Error en la peticion'})
        if(!product) return res.status(404).send({message:'No hay productos para mostrar'});

        return res.status(200).send({
            product,
            total,
            pages:Math.ceil(total/itemsPerPage)
            
        })

    })
}
function uploadImage(req,res){
    if(req.files){
        var file_path=req.files.image.path;
        console.log(file_path)
        var file_split=file_path.split('/');
        console.log(file_split)
        var file_name=file_split[3];
        console.log(file_name)
        var ext_split=file_name.split('.');
        console.log(ext_split)
        var file_ext=ext_split[1]

        if(file_ext == 'png' || file_ext=='jpg'|| file_ext=='jpeg' ||file_ext == 'gif'){
                return res.status(200).send({image:file_name}) 
        }else{
            removeFilesOfUploads(res,file_path,'La extencion no es valida')
           
        }
    }else{
        return res.status(200).send({message:'No se han subido archivos'})
    }
}
function getImageFile(req,res){
    var imageFile= req.params.imageFile;
    var pathFile='./src/upload/product/'+imageFile

    fs.exists(pathFile,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile))
        }else{
            res.status(400).send({message:'El archivo no fue encotrado'})
        }
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
    getImageFile
}

