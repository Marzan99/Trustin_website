const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Only Admins (role_id 1) can create new users
router.post('/', authenticate, authorize([1]), userController.createUser);

module.exports = router;
