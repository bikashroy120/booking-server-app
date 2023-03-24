const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    expierIn:{
        type:Number
    }

},{timestamps:true})

const Otp = mongoose.model("Otp",otpSchema);
module.exports =  Otp;