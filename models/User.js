const pool = require('../config/database');

const User = {
    findByUsername: async (username) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    updateLastLogin: async (id) => {
        await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [id]);
    }
};

module.exports = User;
