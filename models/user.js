import knex from '../db.js';

const tableName = 'users';

const selectAllColumnExceptOne = async (columns) => {
    // Get the column info for the table
    const columnInfo = await knex(tableName).columnInfo();
    const allColumns = Object.keys(columnInfo);

    // Filter out the excluded column
    const selectedColumns = allColumns.filter(column => !columns.includes(column));

    return selectedColumns;
};

export const getAllUsers = async (data, isPasswordSelected = true) => {
    let whereObj = {
        is_deleted: false
    }
    if (data) {
        whereObj = {
            ...whereObj,
            ...data
        }
    }

    let columns;
    if (isPasswordSelected) {
        columns = await selectAllColumnExceptOne(['password']);
    } else {
        columns = '*'
    }

    try {
        return await knex(tableName).select(columns).where(whereObj);
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (userId, where, isPasswordSelected = true) => {

    try {
        let whereObj = {
            id: userId
        }
        if (where) {
            whereObj = {
                ...whereObj,
                ...where
            }
        }

        let columns;
        if (isPasswordSelected) {
            columns = await selectAllColumnExceptOne(['password']);
        } else {
            columns = '*'
        }

        return await knex(tableName).select(columns).where(whereObj).first();
    } catch (error) {
        throw error;
    }
}

export const createUser = async (data) => {
    try {
        const [newUserId] = await knex(tableName).insert(data);

        return await getUserById(newUserId);
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (userId, updates) => {
    try {
        const user = await getUserById(userId, { is_deleted: false });

        if (user) {
            await knex(tableName).where('id', userId).update(updates);

            return await getUserById(userId);
        }

    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const deletedUser = await getUserById(userId);

        let updates = {
            is_deleted: 1
        }

        await knex(tableName).where('id', userId).update(updates);

        return deletedUser;
    } catch (error) {
        throw error;
    }
}
