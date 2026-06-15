const bcrypt = require('bcrypt');
const User = require('../models/User');
const pool = require('../config/database');

const createUser = async (req, res) => {
    try {
        const { username, password, role_id } = req.body;

        if (!username || !password || !role_id) {
            return res.status(400).json({ error: 'Username, password, and role_id are required' });
        }

        // --- Password Policy Enforcement ---
        // Requirement: First letter must be a capital letter
        if (!/^[A-Z]/.test(password)) {
            return res.status(400).json({ error: 'Password must start with a capital letter' });
        }

        // Check if user already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password (bcrypt automatically generates salt)
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'INSERT INTO users (username, password_hash, role_id) VALUES (?, ?, ?)',
            [username, password_hash, role_id]
        );

        res.status(201).json({ message: 'User created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createUser
};
