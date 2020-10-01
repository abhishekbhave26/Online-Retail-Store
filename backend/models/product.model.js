const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const productSchema= new Schema({
    name:{type:String,required:true},
    description:{type:String},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    weight:{type:Number},
    productID:{type:Number,required:true},
    inStock:{type:Boolean, required:true}
    },{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema);

module.exports=Product;
