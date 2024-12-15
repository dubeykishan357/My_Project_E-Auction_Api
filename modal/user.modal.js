import mongoose from "mongoose";

const UserSchema= mongoose.Schema({

    _id:Number,
    status:Number,
    info:String,
    role:String,
    name:{
        type:String,
        required:[true,"name is required"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        lowercase:true,
        uniqe:true,
        trim:true
    },
    password:{
        type:String,
        required:[true," password is required"],
        minlength:5,
        maxlength:10,
        trim:true
    },
    mobile:{
        type:String,
        required:[true,"mobile no. is required"],
        minlength:5,
        maxlength:10,
        trim:true
    },
    address:{
        type:String,
        required:[true," address is required"],
        trim:true
    },
    city:{
        type:String,
        required:[true,"city  is required"],
        trim:true
    },
    gender:{ 
        type:String,
        required:[true," gender is required"],
        trim:true},

})
    const userSchemaModel=mongoose.model("eAuction_collection",UserSchema);

    export default userSchemaModel;
