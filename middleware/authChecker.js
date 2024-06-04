import { handleError } from "../utils/responseHandler.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authChecker = async (req, res, next) => {
    let authorization = req.headers.authorization
    if (!authorization) {
        handleError(res, 400, 'Token required!');
        return;
    }

    try {
        authorization = authorization.split(' ');
        if (authorization[0] !== 'Bearer') {
            handleError(400, 'Invalid request!');
            return;
        } else {
            jwt.verify(authorization[1], process.env.SECRETJSONWEBTOKEN);
            next();
        }
    } catch (err) {
        handleError(res, 403, 'You must be login again!');
        return;
    }
};