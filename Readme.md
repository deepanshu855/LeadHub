# LeadHub

A full-stack Lead Management System built as part of the **Digital Heroes Full Stack Development Internship Qualification Task**.

LeadHub allows businesses to collect customer inquiries through a modern landing page while providing administrators with a secure dashboard to manage, search, and update lead statuses.

> Built for Digital Heroes Training Task

---

## 🚀 Live Demo

**Application:**  
https://leadhub-vouo.onrender.com/

---

## 📌 GitHub

https://github.com/deepanshu855

---

## 👨‍💻 Developer

**Deepanshu Sharma**

- LinkedIn: https://www.linkedin.com/in/deepanshu-sharma-661572323/
- GitHub: https://github.com/deepanshu855

---

# ✨ Features

## Public Landing Page

- Modern responsive UI
- Professional SaaS-inspired design
- Lead capture form
- Client-side validation
- Server-side validation
- Stores inquiries in MongoDB
- Smooth animations
- Mobile-friendly layout

---

## Admin Dashboard

- JWT Authentication
- Protected Routes
- View all leads
- Search leads by Name or Email
- Update lead status
- Dashboard statistics
- Logout functionality
- Responsive UI

---

## Lead Management

Each submitted lead contains:

- Name
- Email
- Budget Range
- Message
- Status
- Created Date

Lead Status:

- New
- Contacted
- Closed

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React
- CSS

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Express Validator
- Cookie Parser
- bcryptjs

## Deployment

- Render

---

# 🏗 Architecture

The project follows a **4-Layer Architecture**, making the application modular, scalable, and easy to maintain.

## Backend Structure

```
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── validator
│   └── app.js
│
├── public
├── server.js
└── package.json
```

### Layer Responsibilities

### 1. Routes Layer

Responsible for:

- Defining API endpoints
- Mapping requests to controllers

---

### 2. Controller Layer

Responsible for:

- Processing requests
- Calling database operations
- Returning API responses

---

### 3. Model Layer

Responsible for:

- Database schemas
- Mongoose models
- Data validation

---

### 4. Middleware Layer

Responsible for:

- Authentication
- Authorization
- Error handling
- Request validation

---

## Frontend Structure

```
frontend
│
├── src
│
├── app
│
├── features
│   ├── auth
│   ├── dashboard
│   ├── lead
│   └── shared
│
├── AuthProvider.jsx
└── main.jsx
```

The frontend follows a **feature-based architecture**, improving scalability and code organization.

---

# 🔐 Authentication

Authentication is implemented using **JWT stored in HTTP-only cookies**.

Features:

- Secure Login
- Protected Routes
- Cookie-based Authentication
- Logout
- Authentication Middleware

For security purposes, the **Admin Registration page is intentionally hidden from the frontend**.

The backend supports registration and limits the application to a maximum of **2 administrator accounts**.

---

# 🗄 Database Schema

## Lead

| Field       | Type   |
| ----------- | ------ |
| name        | String |
| email       | String |
| budgetRange | String |
| message     | String |
| status      | String |
| createdAt   | Date   |
| updatedAt   | Date   |

---

## Admin

| Field    | Type   |
| -------- | ------ |
| email    | String |
| password | String |

---

# 📌 API Endpoints

## Lead Routes

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/leads`            | Create Lead        |
| GET    | `/api/leads`            | Get All Leads      |
| PATCH  | `/api/leads/:id/status` | Update Lead Status |

---

## Admin Routes

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/admin/login`    | Login             |
| POST   | `/api/admin/register` | Register Admin    |
| POST   | `/api/admin/logout`   | Logout            |
| GET    | `/api/admin/get-me`   | Get Current Admin |

---

# ⚙️ Environment Variables

## Backend (.env)

```env
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/deepanshu855/LeadHub.git
```

---

## Install Backend

```bash
cd backend

npm install
```

Run backend

```bash
npm run dev
```

---

## Install Frontend

```bash
cd frontend

npm install
```

Run frontend

```bash
npm run dev
```

---

# 👤 Test Credentials

```
Email:
<your-admin-email>

Password:
<your-password>
```

Replace these with your actual credentials before submission.

---

# 🎯 Design Decisions

## Why JWT?

JWT provides a lightweight and scalable authentication mechanism while keeping protected routes secure.

---

## Why Frontend Search?

Since the application handles a relatively small number of leads, frontend filtering offers an instant user experience without introducing unnecessary backend complexity.

---

## Why Hide Registration?

In production systems, administrator accounts are typically created internally rather than through public registration pages.

To reflect this practice, the backend supports registration while the frontend intentionally exposes only the login functionality.

---

# 🤖 AI Usage

AI tools including ChatGPT and Gemini were used for:

- UI brainstorming
- Architecture discussions
- Documentation improvements
- Code reviews
- Debugging assistance

All implementation, project architecture, feature development, debugging, and final code integration were completed and verified manually.

---

# 📷 Screenshots

_Add application screenshots here._

Suggested screenshots:

- Landing Page
- Lead Submission Form
- Admin Login
- Dashboard
- Lead Search
- Update Status

---

# 🎥 Loom Video

Add your Loom walkthrough link here.

---

# 📄 License

This project was developed solely for the **Digital Heroes Full Stack Development Internship Qualification Task**.

---

## ⭐ If you found this project helpful, consider giving it a star!
