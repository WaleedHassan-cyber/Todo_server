import { JWT_SECRET, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  if (req.headers["authorization"] === undefined) {
    return res.json(jsonGenerate(StatusCode.Auth_ERROR, "Access Denied"));
  }
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
    );
  }
};

export default AuthMiddleware;
