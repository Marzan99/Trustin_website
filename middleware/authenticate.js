const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // হেডার বা কুকি থেকে টোকেন নেওয়ার চেষ্টা করবে
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        // টোকেন যাচাই করা (JWT_SECRET ভেরিয়েবল ব্যবহার করে)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // যাচাই সফল হলে ইউজারের তথ্য req.user-এ সেভ করে রাখবে
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
};

module.exports = authenticate;
