
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    return knex.schema.createTable('profiles', function (table) {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.string('full_name', 255);
        table.date('birthdate');
        table.string('gender', 10);
        table.string('avatar_url', 255);
        table.text('bio');
        table.string('location', 100);
        table.string('website', 255);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('is_deleted').defaultTo(false);
    })
        .then(() => {
            return knex.raw(`
          CREATE TRIGGER profiles_before_insert
          BEFORE INSERT ON profiles
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
    return knex.schema.dropTable('profiles');
};
