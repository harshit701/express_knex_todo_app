/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('todos', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.boolean('completed').defaultTo(false);
        table.timestamps(true, true); // Adds `created_at` and `updated_at` columns
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('todos');
};
