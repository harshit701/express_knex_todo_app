import express from "express";
import { login } from "../service/login.js";

const loginRouter = express.Router();

loginRouter.get('', login);

export default loginRouter;