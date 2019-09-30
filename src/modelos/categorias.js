var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var CategoriaSchema=Schema({
    categ:String,

})



module.exports=mongoose.model('Category',CategoriaSchema)