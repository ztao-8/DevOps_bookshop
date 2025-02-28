CREATE DATABASE IF NOT EXISTS golinksdb;
USE golinksdb;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL
    );

INSERT INTO books (title, description, price, cover) VALUES
                                                         ('Book 1', 'Description of Book 1', 19.99, 'cover1.jpg'),
                                                         ('Book 2', 'Description of Book 2', 29.99, 'cover2.jpg'),
                                                         ('Book 3', 'Description of Book 3', 39.99, 'cover3.jpg');