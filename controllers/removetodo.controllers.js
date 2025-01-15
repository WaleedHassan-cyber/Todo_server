import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js"
import { StatusCode } from "../utils/constants.js"
import todoModel from "../models/Todo.js"
import userModel from "../models/userSchema.js"

export const RemoveTodo =async (req,res) => {
  let errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo id is required",errors.mapped()))
}
try {
    let result = await todoModel.findOneAndDelete({
        _id:req.body.todo_id,
        userId:req.userId
    })
    if(result){
        let user = await userModel.findOneAndUpdate({
            _id:req.userId
        },{
            $pull:{todos:req.body.todo_id}
        })
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo Deleted",null))
    }
  } catch (error) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Not deleted",error))
  }
}
