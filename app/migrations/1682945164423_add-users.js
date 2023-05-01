/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
INSERT INTO users (name, login, password) VALUES
('Axel Foley', 'user', crypt('12345', gen_salt('bf')));
    `);

};

exports.down = pgm => {
    pgm.sql(`
DELETE FROM users WHERE login = 'user';
    `);
};
