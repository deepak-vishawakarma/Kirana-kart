import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true
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
        minlength:8,
        select:false,
        trim:true,
    },
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }]
})

export default mongoose.model("User",UserSchema)