var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
    category:String,
    name:String,
    description:String,
    price:Number,
    number:Number,  
    crateAt:String,
    image:String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    eliminado:Boolean

})



module.exports=mongoose.model('Product',ProducSchema)