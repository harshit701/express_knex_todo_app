import express from "express";
import { add, findAll, findById, remove, update } from "../service/todo.js";
import { authChecker } from "../middleware/authChecker.js";

const todoRouter = express.Router();

todoRouter.get('', authChecker, findAll);
todoRouter.get('/:id', authChecker, findById);
todoRouter.post('/', authChecker, add);
todoRouter.delete('/:id', authChecker, remove);
todoRouter.put('/:id', authChecker, update);

export default todoRouter;