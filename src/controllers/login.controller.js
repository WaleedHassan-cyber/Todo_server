import { validationResult } from "express-validator";
import userModel from "../models/userSchema.js"
import { jsonGenerate } from "../utils/helpers.js";
import {StatusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const Login =async (req,res) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        let {username,password} = req.body;
        const user = await userModel.findOne({username:username})
        if(!user){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"User not Found"))
        }
        const verified = bcrypt.compare(password,user.password)
        if(!verified){
            return res.json(StatusCode.UNPROCESSABLE_ENTITY,"Username or Password incorrect")
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Your Are logged In",{userId:user._id,token:token}))
    }
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation Error",errors.mapped()));
}


export default Login;