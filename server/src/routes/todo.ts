import { Router } from "express";
import { deleteTodo, getTodos, postTodo } from "../controllers/todo";

const routes = Router();

routes.post("/todo", postTodo);
routes.get("/", getTodos);
routes.delete('/todo/:todoId', deleteTodo)

export default routes;
