var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
    category:String,
    name:String,
    description:String,
    price:Number,
    number:Number,  
    crateAt:String,
    image:String
})



module.exports=mongoose.model('Product',ProducSchema)