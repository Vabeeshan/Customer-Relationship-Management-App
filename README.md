# 🚀 Customer Relationship Management (CRM) Application

<div align="center">

![CRM](https://img.shields.io/badge/CRM-Lead%20Management-blue?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?style=for-the-badge&logo=mysql)
![OAuth](https://img.shields.io/badge/Auth-OAuth%202.0-red?style=for-the-badge)

</div>

---

## 📖 About the Project

This is a **Full-Stack Customer Relationship Management (CRM) Lead Management System** designed for small sales teams to efficiently manage customer leads, track sales activities, and monitor the progress of leads through a structured sales pipeline.

The application is built using:

- ⚛️ React.js (TypeScript) Frontend
- 🟢 Node.js + Express.js Backend
- 🗄️ MySQL Database
- 🔐 OAuth 2.0 Authentication
- 🎟️ JWT-Based Authorization

---

## 🔐 Login Credentials

> ⚠️ Authentication is handled using OAuth 2.0 (Auth0 / Okta Integration)

## 🧪 Demo Login Credentials

```text
Email    : adminadmin@example.com
Password : Password123

```
---
<br>

# ⚙️ How to Run the Application Locally

## 📦 Step 1 — Clone the Repository
git clone https://github.com/Vabeeshan/Customer-Relationship-Management-App.git

## 🖥️ Step 2 — Backend Setup

```text
cd Back-End
npm install
npm run dev

```

✅ Backend Server Runs On:

http://localhost:8080



## 🌐 Step 3 — Frontend Setup
cd Front-End
npm install
npm start

✅ Frontend Runs On:

http://localhost:3000

## 🗄️ Step 4 — Database Setup

Create a MySQL database named:

> CREATE DATABASE crm_db;

<br>

# 🔧 Required Environment Variables (.env)


Create a .env file inside the Back-End folder.

PORT=8080
```text
# OAuth Configuration
    AUTH0_DOMAIN=your-domain.auth0.com
    CLIENT_ID=your-client-id
    CLIENT_SECRET=your-client-secret
    REDIRECT_URI=http://localhost:8080/api/auth/callback

# JWT
    JWT_SECRET=your-secret-key

# Database
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=crm_db

```
---

# 🏆 Key Achievements

1. ✨ Full-Stack CRM System
2. ✨ Secure OAuth 2.0 Authentication
3. ✨ JWT-Based Session Management
4. ✨ RESTful API Architecture
5. ✨ Production-Style Backend Structure
6. ✨ Modular Service-Based Architecture
7. ✨ Lead Tracking Workflow
8. ✨ Real-Time Lead Notes Management
9. ✨ Protected Backend APIs
10. ✨ Scalable Folder Structure
11. ✨ Postman API Testing Support


---


# 📌 Features & Functionalities
## Back-End
### 👤 Authentication Module
- OAuth 2.0 Login Integration
- JWT Token Generation
- Secure Route Protection
- Session Verification
### 📊 Lead Management Module
- ➕ Create Leads
- ✏️ Update Leads
- ❌ Delete Leads
- 📄 View All Leads
- 🔍 Search & Filter Leads
- 📈 Track Lead Status
### 📝 Notes Management Module
- Add Notes to Leads
- View Notes by Lead ID
- Chronological Activity Tracking
### 🔄 Workflow Features
- Lead Assignment to Salespersons
- Lead Progress Tracking
- Deal Value Estimation
- Sales Pipeline Management
### 🧪 API Support
- Fully Testable Using Postman
- RESTful API Endpoints
- JSON-Based Request/Response Structure

### 🔐 Authentication & Security
- OAuth 2.0
- Auth0 / Okta
- JWT Authentication
### 🧰 Development Tools
- Git & GitHub
- Postman
- Nodemon
- Antigravity