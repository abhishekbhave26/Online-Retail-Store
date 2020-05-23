const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const contactSchema= new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    description:{type:String,required:false}
    },{
    timestamps:true,

});

const Contact=mongoose.model('Contact',contactSchema);

module.exports=Contact;
