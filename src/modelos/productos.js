var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
    name:String,
    description:String,
    price:Number,
    number:Number,  //borrar
    crateAt:String,
    image:String
})



module.exports=mongoose.model('Product',ProducSchema)