import knex from '../db.js';

const tableName = 'profiles';

export const getAllProfiles = async (query) => {
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

export const getProfileById = async (profileId, where) => {

    try {
        let whereObj = {
            id: profileId
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

export const createProfile = async (data) => {
    try {
        const [newProfileId] = await knex(tableName).insert(data);

        return await getProfileById(newProfileId);
    } catch (error) {
        throw error;
    }
}

export const updateProfile = async (profileId, updates) => {
    try {
        const profile = await getProfileById(profileId, { is_deleted: false });

        if (profile) {
            await knex(tableName).where('id', profileId).update(updates);

            return await getProfileById(profileId);
        }

    } catch (error) {
        throw error;
    }
}

export const deleteProfile = async (profileId) => {
    try {
        const deletedProfile = await getProfileById(profileId);

        let updates = {
            is_deleted: 1
        }

        await knex(tableName).where('id', profileId).update(updates);

        return deletedProfile;
    } catch (error) {
        throw error;
    }
}
