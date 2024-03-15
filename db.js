// knex.js
import knex from 'knex';
import config from './knexfile.mjs';

const environment = process.env.NODE_ENV || 'development';
const dbInstance = knex(config[environment]);

export default dbInstance;