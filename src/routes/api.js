import express from "express";
import Register from "../controllers/resgister.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import Login from "../controllers/login.controller.js";
import { createTodo } from "../controllers/todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/todolist.controller.js";
import { Marktodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/removetodo.controllers.js";


const apiRoute= express.Router();
export const protectedRoute = express.Router();


// Api Route
apiRoute.post("/register",RegisterSchema, Register);
apiRoute.post("/login",LoginSchema, Login);


// Protected Routes
protectedRoute.post('/createdTodo',check("desc","Todo Desc is required").exists(),createTodo)
protectedRoute.get('/todolist',GetTodos);
protectedRoute.post('/marktodo',check("todo_id","Todo Id is required").exists(),Marktodo)
protectedRoute.post('/deletetodo',check("todo_id","Todo Id is required").exists(),RemoveTodo)

export default apiRoute;