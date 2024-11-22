# Task Management API

A robust and efficient **Task Management API** built using Node.js, Express.js, and PostgreSQL. This project enables authenticated users to manage tasks, perform CRUD operations, and filter, sort, or search tasks based on various criteria.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [System Requirements](#system-requirements)
4. [Setup and Installation](#setup-and-installation)
5. [API Documentation](#api-documentation)
6. [Improvements and Assumptions](#improvements-and-assumptions)
7. [Evaluation Criteria](#evaluation-criteria)
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

 
