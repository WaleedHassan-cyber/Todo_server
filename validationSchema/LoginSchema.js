import { check } from "express-validator";

export const LoginSchema = [
  check("username", "Username Should be contain Alphanumeric Character Only")
    .exists()
    .isAlphanumeric()
    .withMessage("Username is required")
    .trim()
    .isLength({ min: 6, max: 32 }),
  check("password", "Password contain at least 8 character")
    .exists()
    .withMessage("Password is Required")
    .trim()
    .isLength({ min: 8, max: 100 })
];
