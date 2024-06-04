import Joi from 'joi';
import { getAllUsers, getUserById } from '../models/user.js';
import { validate } from '../utils/validator.js';
import { handleError, handleSuccess } from '../utils/responseHandler.js';
import bcrypt from 'bcrypt';
import { getAllProfiles } from '../models/profile.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const login = async (req, res) => {
    let { email, password } = req.body;
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    await validate(loginSchema, {
        email, password
    });

    try {
        const existingUser = await getAllUsers({ email }, false);
        if (existingUser.length === 0) {
            handleError(res, 404, 'user not found');
        }

        const hasedpassword = await bcrypt.compare(password, existingUser[0].password);
        if (hasedpassword) {
            const user = await getUserById(existingUser[0].id);

            if (user) {
                const profile = await getAllProfiles({
                    user_id: user.id
                });
                user.profile = profile[0];

                //Creating jwt token
                const token = jwt.sign(
                    {
                        userId: user.id,
                        email: user.email
                    },
                    process.env.SECRETJSONWEBTOKEN,
                    { expiresIn: process.env.TOKENEXPIRYTIME }
                );

                handleSuccess(res, { token, user });
            }
        } else {
            handleError(res, 401, 'login details are incorrect!');
        }
    } catch (error) {
        handleError(res, 500, error.message);
    }
}