import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js"
import { StatusCode } from "../utils/constants.js"
import todoModel from "../models/Todo.js"

export const Marktodo = async(req,res) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()){
       return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo id is required",errors.mapped()))
    }
    try {
        let todo = await todoModel.findOneAndUpdate({
            _id:req.body.todo_id,
            userId:req.userId
        },[{
            $set:{
                isCompleted:{
                    $eq:[false,"$isCompleted"]
                }
            }
        }]);
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Updated",todo))
    } catch (error) {
       return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Not Update",error))
        
    }
  
}
