var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    number:Number, 
    crateAt:String,
    image:String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    eliminado:Boolean,
    
    /* agregado test */
    litros: String,
    fragancias: String

})



module.exports=mongoose.model('Product',ProducSchema)