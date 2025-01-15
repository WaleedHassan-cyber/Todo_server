import { check } from "express-validator";



export const RegisterSchema=[
    check('name').trim().isAlpha().withMessage("Name should be in Alphabet"),
    check("username","Username is required").exists().isAlphanumeric().withMessage("User Should be contain Alphanumeric Character Only").trim().isLength({min:6,max:32}),
    check("password","Password is required").exists().isLength({min:8,max:100}).trim(),
    check("email","Email is required").exists().isEmail(),
] 