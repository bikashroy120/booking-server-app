const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        mix:50, 
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    photo:{
        type:String
    },
    phone:{
        type:String
    },
    barth:{
        type:Date
    },
    rolId:{
        type:String,
        default:"user"
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})

const User = mongoose.model("User",UserSchema);
module.exports =  User;