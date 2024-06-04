import express from "express";
import { add, findAll, findById, remove, update } from "../service/user.js";

const userRouter = express.Router();

userRouter.get('', findAll);
userRouter.get('/:id', findById);
userRouter.post('/', add);
userRouter.delete('/:id', remove);
userRouter.put('/:id', update);

export default userRouter;