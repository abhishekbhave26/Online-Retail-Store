const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    address:{type:String},
    address2:{type:String},
    city_state:{type:String},
    zip:{type:Number},
    age:{type:Number},
    height:{type:Number},
    weight:{type:Number},
    isVerified:{type:Boolean},
    otp:{type:Number}

},{
    timestamps:true,

});

const User=mongoose.model('User',userSchema);

module.exports=User;
