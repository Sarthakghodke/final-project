CREATE DATABASE healthcare_db;

USE healthcare_db;

CREATE TABLE health_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    symptoms TEXT,
    disease VARCHAR(255),
    precautions TEXT,
    remedies TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
