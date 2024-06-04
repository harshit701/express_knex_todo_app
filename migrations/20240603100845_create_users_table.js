
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    return knex.schema.createTable('users', function (table) {
        table.uuid('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('is_deleted').defaultTo(false);
    })
        .then(() => {
            return knex.raw(`
          CREATE TRIGGER users_before_insert BEFORE INSERT ON users
          FOR EACH ROW
          BEGIN
            IF NEW.id IS NULL THEN
              SET NEW.id = UUID();
            END IF;
          END;
        `);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    return knex.schema.dropTable('users');
};
