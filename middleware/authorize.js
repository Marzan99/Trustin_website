const authorize = (requiredRoles) => {
    return (req, res, next) => {
        // req.user থেকে ইউজারের রোল চেক করবে
        if (!req.user || !req.user.roleId) {
            return res.status(403).json({ error: 'Forbidden. Role not found.' });
        }
        
        // Example: Admin is roleId 1, HR is 2, Manager is 3
        if (requiredRoles.includes(req.user.roleId)) {
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden. Insufficient permissions.' });
        }
    };
};

module.exports = authorize;
