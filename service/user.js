import Joi from 'joi';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../models/user.js';
import { validate } from '../utils/validator.js';
import { handleError, handleSuccess } from '../utils/responseHandler.js';
import { createProfile, getAllProfiles } from '../models/profile.js';
import bcrypt from 'bcrypt';

export const findAll = async (req, res) => {
    const data = req.body;

    try {
        const users = await getAllUsers(data);
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                const profile = await getAllProfiles({
                    user_id: users[i].id
                });
                users[i].profile = profile[0];
            }
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const findById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUserById(userId);

        if (user) {
            const profile = await getAllProfiles({
                user_id: user.id
            });
            user.profile = profile[0];
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const add = async (req, res) => {
    const saltRounds = 10;
    try {
        const { username, email, password, full_name, birthdate, gender, avatar_url, bio, location, website } = req.body;
        const userSchema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        await validate(userSchema, {
            username, email, password
        });
        const profileSchema = Joi.object({
            full_name: Joi.string(),
            birthdate: Joi.date(),
            gender: Joi.string(),
            avatar_url: Joi.string(),
            bio: Joi.string(),
            location: Joi.string(),
            website: Joi.string(),
        });
        await validate(profileSchema, {
            full_name, birthdate, gender, avatar_url, bio, location, website
        });

        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = await createUser({
            username,
            email,
            password: passwordHash,
            is_deleted: false
        });
        let profile = false;

        if (user) {
            profile = await createProfile({
                full_name,
                birthdate,
                gender,
                avatar_url,
                bio,
                location,
                website,
                is_deleted: false,
                user_id: user.id
            });
        }
        user.profile = profile;

        handleSuccess(res, user);
    } catch (error) {
        handleError(res, error.statusCode, error.message);
    }
};

export const remove = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await deleteUser(userId);

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        console.log(userId, updates)
        // Add validations

        const updatedUser = await updateUser(userId, updates);

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}