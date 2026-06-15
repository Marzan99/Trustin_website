-- Database creation
CREATE DATABASE IF NOT EXISTS trustin_admin;
USE trustin_admin;

-- Create Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Create Permissions Table
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL UNIQUE
);

-- Create Role-Permissions mapping
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create Users Table (Authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(100),
    join_date DATE NOT NULL,
    status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    profile_image_path VARCHAR(255),
    user_id INT UNIQUE, -- Optional link to users table if employees can login
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Sample Seed Data
-- Insert base roles if they don't exist
INSERT IGNORE INTO roles (id, role_name, description) VALUES 
(1, 'Admin', 'Full access to the system'),
(2, 'HR', 'Manage employees, cannot modify system settings'),
(3, 'Manager', 'View employee data and manage department');

-- Create an Admin user (password: 'admin123')
INSERT IGNORE INTO users (id, username, password_hash, role_id) VALUES 
(1, 'admin_user', '$2b$10$wT0dG2k4T/gMh2O7/eY9LutT7wWd7vKx0S8g/qE4J5O3JtO5M0z3K', 1);

-- Seed employee
INSERT IGNORE INTO employees (id, name, email, role, department, join_date, status) VALUES 
(1, 'Jane Doe', 'jane.doe@trustin.com', 'Senior Developer', 'Engineering', '2025-01-15', 'Active');
