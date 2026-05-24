CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user'
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    specifications TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,

    CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cart_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);


INSERT INTO products
(name, description, specifications, price, stock)
VALUES
(
    'Laptop',
    'A lightweight laptop suitable for study and work.',
    '15-inch display, 16GB RAM, 512GB SSD, Intel Core i7 processor, up to 10 hours battery life.',
    1099.99,
    6
),
(
    'Mouse',
    'A wireless mouse with ergonomic design.',
    '2.4GHz wireless connection, adjustable DPI, rechargeable battery, silent click buttons.',
    29.99,
    18
),
(
    'Keyboard',
    'A mechanical keyboard with comfortable typing experience.',
    'Mechanical switches, white backlight, compact layout, USB-C connection.',
    79.99,
    10
),
(
    'Headphones',
    'Noise-cancelling headphones for music and meetings.',
    'Active noise cancellation, Bluetooth 5.3, built-in microphone, up to 30 hours battery life.',
    149.99,
    12
),
(
    'Monitor',
    'A 32-inch Full HD monitor for office and entertainment.',
    '32-inch display, Full HD resolution, IPS panel, HDMI and DisplayPort support.',
    379.99,
    8
);

INSERT INTO users (username, password_hash, role)
VALUES
('admin', '$2b$12$N3zUZDfyN/tr2NcIiR6vTO7lKficWIDXl5TgbNH1CX.fE0c53I7l2', 'admin');