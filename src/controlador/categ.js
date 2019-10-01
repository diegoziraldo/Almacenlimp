'use strict'

var Category=require('../modelos/categorias');
var moment=require('moment')
var mongoosePaginate = require('mongoose-pagination');
var fs =require('fs');
var path=require('path');

// guardar Categorias
function saveCategory(req ,res){
    var category=new Category();
    var params=req.body;

    category.categ=params.categoria;


    category.save((err,categoryStored)=>{
        if(err) return res.status(500).send({message:'Error al guardar el producto'})

        if(categoryStored){
            res.status(200).send({categoria:categoryStored})
            console.log('categoria guardada')
        }else{
            res.status(404).send({message:'No se ha guardado la categoria'})
        }
    })
}

function traerCategorias(req,res){
    Category.find({}, function (err, docs) {
        res.status(200).send({categoria:docs})});
}

module.exports={
    traerCategorias,
    saveCategory,

}

