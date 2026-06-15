const pool = require('../config/database');

const Employee = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT id, name, email, role, department, join_date, status, profile_image_path FROM employees');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await pool.query('SELECT id, name, email, role, department, join_date, status, profile_image_path FROM employees WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (employeeData) => {
        const { name, email, role, department, join_date, status, profile_image_path } = employeeData;
        const [result] = await pool.query(
            'INSERT INTO employees (name, email, role, department, join_date, status, profile_image_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, role, department, join_date, status, profile_image_path]
        );
        return result.insertId;
    },
    update: async (id, employeeData) => {
        const { name, email, role, department, join_date, status, profile_image_path } = employeeData;
        await pool.query(
            'UPDATE employees SET name = ?, email = ?, role = ?, department = ?, join_date = ?, status = ?, profile_image_path = ? WHERE id = ?',
            [name, email, role, department, join_date, status, profile_image_path, id]
        );
    },
    delete: async (id) => {
        await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    }
};

module.exports = Employee;
