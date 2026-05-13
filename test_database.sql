-- Test Script untuk Database FinBear
-- Jalankan ini untuk testing koneksi dan import

-- Test 1: Create database
CREATE DATABASE IF NOT EXISTS finbear_db_test;
USE finbear_db_test;

-- Test 2: Create tables dengan format datetime yang benar
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Test 3: Insert dengan format datetime yang benar
INSERT INTO users (id, username, password, points, createdAt) VALUES
('test123', 'testuser', '$2b$10$testpassword', 0, '2026-05-13 10:30:00');

-- Test 4: Query untuk verifikasi
SELECT * FROM users;

-- Test 5: Cleanup
DROP DATABASE IF EXISTS finbear_db_test;
