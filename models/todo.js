import knex from '../db.js';

const tableName = 'todos';

export const getAllTodos = async (query) => {
    let whereObj = {
        is_deleted: false
    }
    if (query) {
        whereObj = {
            ...whereObj,
            ...query
        }
    }

    try {
        return await knex(tableName).select('*').where(whereObj);
    } catch (error) {
        throw error;
    }
}

export const getTodoById = async (todoId, where) => {

    try {
        let whereObj = {
            id: todoId
        }
        if (where) {
            whereObj = {
                ...whereObj,
                ...where
            }
        }
        return await knex(tableName).where(whereObj).first();
    } catch (error) {
        throw error;
    }
}

export const createTodo = async (title, description = '', completed = false) => {
    try {
        const [newTodoId] = await knex(tableName).insert({
            title,
            description,
            completed,
        });

        return await getTodoById(newTodoId);
    } catch (error) {
        throw error;
    }
}

export const updateTodo = async (todoId, updates) => {
    try {
        const todo = await getTodoById(todoId, { is_deleted: false });

        if (todo) {
            await knex(tableName).where('id', todoId).update(updates);

            return await getTodoById(todoId);
        }

    } catch (error) {
        throw error;
    }
}

export const deleteTodo = async (todoId) => {
    try {
        const deletedTodo = await getTodoById(todoId);

        let updates = {
            is_deleted: 1
        }

        await knex(tableName).where('id', todoId).update(updates);

        return deletedTodo;
    } catch (error) {
        throw error;
    }
}
