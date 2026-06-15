const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.getAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createEmployee = async (req, res) => {
    try {
        const { name, email, role, department, join_date, status } = req.body;
        let profile_image_path = null;

        if (req.file) {
            profile_image_path = req.file.filename; // Only store filename, not full path
        }

        const newEmployeeId = await Employee.create({
            name, email, role, department, join_date, status, profile_image_path
        });

        res.status(201).json({ message: 'Employee created', id: newEmployeeId });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, email, role, department, join_date, status } = req.body;
        let profile_image_path = req.body.existing_image; // Keep existing if no new upload

        if (req.file) {
            profile_image_path = req.file.filename;
        }

        await Employee.update(req.params.id, {
            name, email, role, department, join_date, status, profile_image_path
        });

        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        await Employee.delete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
