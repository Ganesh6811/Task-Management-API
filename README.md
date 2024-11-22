# Task Management API

A robust and efficient **Task Management API** built using Node.js, Express.js, and PostgreSQL. This project enables authenticated users to manage tasks, perform CRUD operations, and filter, sort, or search tasks based on various criteria.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [System Requirements](#system-requirements)
4. [Setup and Installation](#setup-and-installation)
5. [API Documentation](#api-documentation)

---

## Features

### Core Functionality
- **User Authentication**:
  - **Register**: Securely create accounts with hashed passwords.
  - **Login**: Authenticate users and generate a JWT token.
  - **Protected Endpoints**: Only authorized users can manage tasks.
  
- **Task Management**:
  - Create new tasks with validations (e.g., future due dates).
  - Update task details.
  - Delete tasks.
  - Fetch tasks by ID or retrieve all tasks.

### Advanced Capabilities
- **Filter Tasks**:
  - Filter tasks based on `status` and `priority`.
- **Sort Tasks**:
  - Sort tasks by `priority` or `due_date` in ascending or descending order.
- **Search Tasks**:
  - Search tasks by title or description using partial matches.

### Validations and Error Handling
- Input validations for all endpoints.
- Meaningful error messages for invalid requests and edge cases.
- Secure API with JWT and hashed passwords.

---

## Technologies Used
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT with `jsonwebtoken`
- **Password Security**: `bcryptjs` for hashing
- **Utilities**: 
  - `moment` for date handling
  - `pg` for PostgreSQL integration

---

## System Requirements
- **Node.js**: v16 or higher
- **PostgreSQL**: v13 or higher
- **npm**: v8 or higher
- A terminal (e.g., PowerShell, Bash)

---

## Setup and Installation

### Prerequisites
- Ensure PostgreSQL is installed and running.
- Create a database named `TaskManagement`.

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ganesh6811/Task-Management-API.git
   cd task-management-system

2. **Install Dependencies**
   ```bash
   npm install


3. **Set up the Database:**
  - Create the necessary tables in the TaskManagement database. Execute the following SQL commands in your PostgreSQL client:
    ```bash
    
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
    );
    
    CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    priority VARCHAR(10),
    due_date DATE
    );

4. **Start the Server**
   -Run the following command to start the server:
   ```bash
   npm start


## API Documentation
   ### Authentication Endpoints 

1. **POST /auth/register: Register a new user**
- Request body: { "username": "user", "password": "password" }
- Response: { "message": "username details are saved" }


2. **POST /auth/login: Log in and obtain a JWT token**
- Request body: { "username": "user", "password": "password" }
- Response: { "token": "your-jwt-token" }

### Task Management Endpoints
1. **GET /tasks: Retrieve all tasksn**
- Response: List of all tasks

  
2. **GET /tasks/:id: Get task by ID**
- Response: Task details

3. **POST /tasks: Create a new task**
- Request body: { "title": "Task Title", "description": "Task Description", "status": "Pending", "priority": "High", "due_date": "2024-12-31" }
- Response: { "message": "Task created successfully" }

4. **PUT /tasks/:id: Update task by ID**
- Request body: { "title": "Updated Title", "description": "Updated Description", "status": "In Progress", "priority": "Medium", "due_date": "2024-12-15" }
- Response: { "message": "Task updated successfully" }

5. **DELETE /delete/tasks/:id: Delete task by ID**
- Response: { "message": "Task deleted successfully" }

6. **GET /status/priority: Filter tasks by status and priority**
- Request body: { "status": "Pending", "priority": "High" }
- Response: List of filtered tasks

7. **GET /sort: Sort tasks by priority or due date**
- Request body: { "col": "priority", "typ": "asc" }
- Response: Sorted task list
  
8. **GET /search: Search tasks by title or description**
- Query parameter: query=search-term
- Response: List of tasks matching the search query



 
