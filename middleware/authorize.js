const authorize = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.roleId) {
            return res.status(403).json({ error: 'Forbidden. Role not found.' });
        }
        
        // Example: Admin is roleId 1, HR is 2, Manager is 3
        if (requiredRoles.includes(req.session.roleId)) {
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden. Insufficient permissions.' });
        }
    };
};

module.exports = authorize;
