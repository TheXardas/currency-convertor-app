/* eslint-disable camelcase */

/**
 * Init migration
 */

exports.shorthands = undefined;

exports.up = pgm => {
    // Add crypto extension for pass storage
    pgm.createExtension('pgcrypto');

    // Add table for storing user login info
    pgm.createTable('users', {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
        login: { type: 'varchar(1000)', notNull: true, unique: true },
        // We will use pgcrypto for storing passwords
        password: { type: 'varchar(1000)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('users', ['login', 'password']);

    // Add table for storing currency rates
    // We will use USD as a base_currency.
    // But storage will allow to modify that in the future, if required
    pgm.createTable('currency_rates', {
        id: 'id',
        base_currency: { type: 'varchar(3)', notNull: true },
        target_currency: { type: 'varchar(3)', notNull: true },
        rate: { type: 'numeric', notNull: true },
        date: { type: 'date', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('currency_rates', ['base_currency', 'target_currency', 'date']);
    pgm.createIndex('currency_rates', ['base_currency', 'date']);
};

exports.down = pgm => {
    pgm.dropTable('users');
    pgm.dropTable('currency_rates');
    pgm.dropExtension('pgcrypto');
};
