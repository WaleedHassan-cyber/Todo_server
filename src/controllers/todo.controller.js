import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import todoModel from "../models/Todo.js";
import userModel from "../models/userSchema.js";

export const createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo is Require",
        error.mapped()
      )
    );
  }
  try {
    const result = await todoModel.create({
      userId: req.userId,
      desc: req.body.desc,
    });
    if (result) {
      const user = await userModel.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        }
      );
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo Created", result));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something Went Wrong",
        error
      )
    );
  }
};
