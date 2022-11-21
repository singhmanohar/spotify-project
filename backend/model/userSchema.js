const mongoose = require("mongoose");
const bcryptjs=require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
});

userSchema.pre("save",async function (next){
    try {
        if (this.isModified("password")) {
            this.password=await bcryptjs.hash(this.password,12);
            this.cpassword=await bcryptjs.hash(this.cpassword,12);
        }
        next();
    } catch (error) {
        console.log(error);
    }
})

const User=new mongoose.model("User",userSchema);
module.exports=User;