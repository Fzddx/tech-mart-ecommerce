# Tech Mart – E-Commerce Shopping Cart

## Overview

Tech Mart is a simple e-commerce shopping cart website developed using FastAPI, React and MySQL.

The system allows users to browse products, search products in real time, manage their shopping cart, and securely authenticate using password hashing and JWT tokens.

The website solves the problem of providing a lightweight online shopping platform where users can:

- Register and login securely
- Browse products
- Search products instantly
- Add products to cart
- Update product quantities in cart
- Remove products from cart
- Share synchronized product stock between all users

An administrator account is also provided, allowing the admin to:

- View all users
- View each user's shopping cart

---

## Technical Stack

### Frontend

- React
- JavaScript
- HTML
- CSS

### Backend

- FastAPI
- Python
- JWT Authentication

### Database

- MySQL

---

## Features

### User Features

- User registration
- User login/logout
- JWT authentication
- Real-time product search
- Product detail modal
- Add products to cart
- Update cart quantity
- Remove cart items
- Shared product stock system

### Admin Features

- Admin login
- View all users
- View each user's shopping cart

---

## How to Run the Application

### 1. Backend Setup

Create virtual environment:

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

- macOS/Linux

```bash
source venv/bin/activate
```

- Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

---

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Database Setup

**Option 1 (Command Line)**

(1) Enter MySQL: change your username and enter your password.
```bash
mysql -u yourusername -p
```
(2) Create the database.
```bash
CREATE DATABASE ecommerce_db;
```
```bash
USE ecommerce_db;
```
```bash
SOURCE database.sql;
```
```bash
exit
```
**Option 2 (Using MySQL Workbench)**

- Open `database.sql` in MySQL Workbench and execute the script.

<br>

After creating the database, open database.py and change your `username` and `password`.

---

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Default Admin Account

```text
Username: admin
Password: abc123456
```

The admin account is pre-created in the database.

---

## Folder Structure

```text
Assignment2_ZhengFu/
│
├── backend/
│   ├── api.py
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
│
├── database/
│   └── database.sql
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── images/
│   │   │   └── Product images
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── styles/
│   │   │   └── main.css
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

---

## Folder Explanation

### backend/

Contains the FastAPI backend application.

| File | Description |
|---|---|
| api.py | API routes and business logic |
| auth.py | JWT authentication and password hashing |
| database.py | Database connection setup |
| main.py | FastAPI application entry point |
| models.py | SQLAlchemy database models |
| schemas.py | Pydantic request/response schemas |

---

### database/

Contains SQL database setup files.

| File | Description |
|---|---|
| database.sql | Creates tables and inserts product data |

---

### frontend/

Contains the React frontend application.

| Folder/File | Description |
|---|---|
| components/Navbar.jsx | Navigation bar component |
| components/ProductCard.jsx | Product card component for displaying products |
| pages/Admin.jsx | Admin page for viewing users' shopping carts |
| pages/Cart.jsx | Shopping cart page |
| pages/Login.jsx | User login and registration page |
| pages/Products.jsx | Product browsing and searching page |
| images/ | Product images |
| styles/ | CSS styling |
| api.js | Frontend API requests |
| App.jsx | React routes |
| main.jsx | React entry point |

