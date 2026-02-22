<p align="center">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

# Bershka Clone – Vanilla PHP Version

*A full-featured e-commerce web application inspired by the Bershka website, built entirely from scratch with Vanilla PHP, HTML, CSS, JavaScript, and MySQL (No Frameworks).*

This project is a complete e-commerce web application inspired by the Bershka website. Unlike modern framework-based applications, this version is developed using **Vanilla PHP** and raw **SQL queries (PDO/MySQLi)**. It demonstrates a strong understanding of core web development concepts, manual session handling, and direct API integrations without relying on external libraries.

Originally created as part of a university exam, it has been refactored and enhanced for use as a professional portfolio project.

[![Bershka Clone Screenshot](https://camo.githubusercontent.com/5e3e86b62e1273df64148247f435ed97f36aa4c7bc33ed2db38aa0f81fb52810/68747470733a2f2f692e696d6775722e636f6d2f54576554714f512e6a706567)](https://camo.githubusercontent.com/5e3e86b62e1273df64148247f435ed97f36aa4c7bc33ed2db38aa0f81fb52810/68747470733a2f2f692e696d6775722e636f6d2f54576554714f512e6a706567)

---

## 🌟 Overview

The application replicates a modern fashion e-commerce experience with real-time product search, user authentication, cart and wishlist management, and checkout via Stripe.

Building this without a framework required custom implementations for the MVC architecture (Model-View-Controller pattern), secure routing, password hashing, and raw database interactions, showcasing solid backend fundamentals.

---

## ✨ Features

### Frontend
* Fully responsive layout built with pure HTML5 and CSS3.
* Vanilla JavaScript for DOM manipulation, AJAX/Fetch requests, and dynamic UI updates.
* Live product search integrated with external APIs.
* Modal-based dynamic cart and interactive wishlist.

### Backend (Vanilla PHP)
* Custom authentication system (Login, Registration) using native PHP `$_SESSION` and `password_hash()`.
* Manual implementation of the MVC pattern to separate logic from presentation.
* Raw SQL queries via PDO/MySQLi to manage users, products, wishlists, carts, and orders securely (using prepared statements to prevent SQL Injection).
* Server-side integration with external APIs for translation, currency conversion, and Stripe checkout.

---

## 🚀 Installation & Setup

Since this project does not use Composer or NPM, setting it up is straightforward. You will need a local server environment like **XAMPP, MAMP, or Laragon**, or the built-in PHP server.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/toNReverse/bershka-clone-php.git](https://github.com/toNReverse/bershka-clone-php.git)
   cd bershka-clone-php
   ```

2. **Database Setup:**
   * Open your MySQL management tool (e.g., phpMyAdmin, DBeaver).
   * Create a new empty database named `bershka_clone` (or your preferred name).
   * Import the provided SQL dump file (usually named `database.sql` or similar, located in the root or `/db` folder) to generate the required tables and sample data.

3. **Environment & Configuration:**
   * Locate the database configuration file (e.g., `config.php` or `db_connect.php`).
   * Update the credentials to match your local MySQL server:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'root');
     define('DB_PASS', '');
     define('DB_NAME', 'bershka_clone');
     ```

4. **Run the application:**
   * **Option A (XAMPP/MAMP):** Move the cloned folder into your `htdocs` or `www` directory and access it via `http://localhost/bershka-clone-php`.
   * **Option B (PHP Built-in Server):** Run the following command in the project root:
     ```bash
     php -S localhost:8000
     ```
     Then open `http://localhost:8000` in your browser.

---

## ⚙️ Configuration (API Keys)

To enable external features, you need to configure your API keys. Look for the API configuration section in your PHP files (often in a `config.php` or within the specific scripts handling the requests) and insert your keys:

* **SerpAPI:** Used for product search functionality. Register at [https://serpapi.com](https://serpapi.com).
* **MyMemory Translation API:** Used to dynamically translate product names and descriptions. Register at [https://mymemory.translated.net/doc/spec.php](https://mymemory.translated.net/doc/spec.php).
* **ExchangeRate API:** Used to convert product prices. Obtain it from [https://www.exchangerate-api.com](https://www.exchangerate-api.com).
* **Stripe:** Used for test payment processing. Requires `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY` from your dashboard at [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys).

---

## 📄 License

This project is released under the **MIT License**.

You are free to use, modify, and distribute the code for personal or commercial purposes, provided that proper credit is given to the original author.

> © 2025 Marco Sapienza
> 
> This project was originally developed as part of an academic coursework and later refined for portfolio presentation purposes.

For full license details, please refer to the `LICENSE` file included in this repository.
