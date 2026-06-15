const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

// All employee routes require authentication
router.use(authenticate);

// Get all employees (accessible to Admin, HR, Manager)
router.get('/', authorize([1, 2, 3]), employeeController.getAllEmployees);

// Get single employee
router.get('/:id', authorize([1, 2, 3]), employeeController.getEmployeeById);

// Create employee (accessible to Admin and HR)
router.post('/', authorize([1, 2]), upload.single('profile_image'), employeeController.createEmployee);

// Update employee (accessible to Admin and HR)
router.put('/:id', authorize([1, 2]), upload.single('profile_image'), employeeController.updateEmployee);

// Delete employee (accessible to Admin only)
router.delete('/:id', authorize([1]), employeeController.deleteEmployee);

module.exports = router;
