import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode} from "../utils/constants.js";
import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const Register = async (req, res) => {
  const error = validationResult(req);
  
  if (error.isEmpty()) {
    let { name, email, username, password } = req.body;
    const userExists = await userModel.findOne({
      $or: [
        {
          email:email,
        },
        {
          username:username,
        },
      ],
    });
    if (userExists) {
      res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User Already exists")
      );
    }
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let user = await userModel.create({
            name,
            password: hash,
            email,
            username,
          });
          const token = jwt.sign({userId: user._id},process.env.JWT_SECRET)
          res.json(jsonGenerate(StatusCode.SUCCESS, "User Created", {userId:user._id,token:token}));
        });
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json(
      jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation Error", error.mapped())
    );
  }
};

export default Register;
