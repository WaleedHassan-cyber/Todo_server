import userModel from "../models/userSchema.js"
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";


export const GetTodos = async (req,res) =>{
    try {
        const list = await userModel.findById(req.userId).select("-password").populate("todos").exec();
        // console.log(list)
        return res.json(jsonGenerate(StatusCode.SUCCESS,"All Todo List",list))
        
    }catch(error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Something Went Wrong",error))
    }
  
}
