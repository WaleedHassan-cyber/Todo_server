import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        min:6,
        max:32,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        min:8,
        max:100,
        required:true
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"todo"
    }],
    date:{
        type:Date,
        default:Date.now,
    }

})

export default mongoose.model("user",userSchema)