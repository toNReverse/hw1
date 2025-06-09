CREATE DATABASE IF NOT EXISTS hw1;
USE hw1;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE if NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  snippet TEXT,
  price VARCHAR(100),
  thumbnail TEXT,
  foreign key (user_id) references users(id)
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  snippet TEXT,
  price VARCHAR(100),
  thumbnail TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);