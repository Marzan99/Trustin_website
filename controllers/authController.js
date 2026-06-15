const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findByUsername(username);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        await User.updateLastLogin(user.id);

        // ১. পাসওয়ার্ড সঠিক হলে টোকেন তৈরি করা হবে
        const token = jwt.sign(
            { userId: user.id, roleId: user.role_id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // ২. সাকসেস মেসেজের সাথে টোকেনটিও ফ্রন্টএন্ডে পাঠিয়ে দেওয়া হবে
        return res.status(200).json({
            message: '✅ Login Successful!',
            token: token,
            user: { email: user.username, roleId: user.role_id }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const logout = (req, res) => {
    // JWT এর ক্ষেত্রে লগআউট সাধারণত ক্লায়েন্ট সাইডে টোকেন ডিলিট করে করা হয়
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    login,
    logout
};
