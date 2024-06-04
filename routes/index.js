import express from "express";
import todoRouter from "./todo.js";
import userRouter from "./user.js";
import loginRouter from "./login.js";

const router = express.Router();

router.use('/todo', todoRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);

export default router;