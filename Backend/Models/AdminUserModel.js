import mongoose, { Mongoose } from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim: true
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
        minlength: 8 ,
        select:false,
        trim:true,
    },
})

export default mongoose.model("Admin",AdminUserSchema)