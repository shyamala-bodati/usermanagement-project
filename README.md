# EngageSphere – User Management System

This project is a **User Management System** built using **Node.js, Express, MongoDB, and React.js** with a frontend developed using **HTML, CSS, and JavaScript**.  
It allows the **Admin to manage users, update details, and control access efficiently through a dashboard**.

---

## 🚀 Features

- 🔑 **Admin Login** – Secure authentication using JWT  
- 👤 **User Management** – Add, update, and delete users from the system  
- 📋 **User Dashboard** – View user details and manage profiles  
- 🛡 **Role-Based Access** – Admin and User roles with different permissions  
- 🔎 **Search Users** – Easily find users and update their information  
- 🗄 **Database Storage** – All user records stored in **MongoDB**

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- React.js
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB
- Mongoose

---

## 🎯 How It Works

### 1️⃣ Admin Login

Admin enters credentials → secure authentication using **JWT**

---

### 2️⃣ Admin Dashboard

Admin can:

- View all users  
- Add new users  
- Edit user details  
- Delete users  

---

### 3️⃣ User Management

User information such as:

- Name  
- Email  
- Role  
- Profile details  

is stored and managed through **MongoDB**.

---

### 4️⃣ Database

MongoDB stores:

- User data  
- Authentication details  
- Role-based permissions  

Admin can retrieve and manage records easily.

---

## ⚙️ Installation / Setup

### Clone the repository

```bash
git clone https://github.com/shyamala-bodati/usermanagement-project.git
```

---

### Install backend dependencies

```bash
cd backend
npm install
```

---

### Install frontend dependencies

```bash
cd frontend
npm install
```

---

### Setup environment variables

Create a `.env` file inside **backend**

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### Run backend server

```bash
cd backend
npm start
```

---

### Run frontend

```bash
cd frontend
npm run dev
```

---

## 📊 Future Improvements

- Password reset functionality  
- Email notifications  
- User activity tracking  
- Admin analytics dashboard  

---

## 👨‍💻 Author

**Shyamala Bodati**  
Full Stack MERN Developer
