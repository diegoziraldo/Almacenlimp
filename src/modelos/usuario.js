'use strict'

var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var UserShema= Schema({
    name:String,
    surname:String,
    email:String,
    password:String,
    role:String,
    image:String,
    CreateAt:String
})



module.exports=mongoose.model('User',UserShema)