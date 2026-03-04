EngageSphere – User Management System

EngageSphere is a full-stack user management platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows administrators to manage users, update their information, and control access through a secure dashboard.

🚀 Features

🔐 Authentication System Secure login and registration using JWT authentication.

👤 User Management Admins can add, update, delete, and view users in the system.

📋 User Dashboard Users can view their profile and manage personal details.

🛡 Role-Based Access Control Admin and normal users have different permissions.

🔎 Search and Update Users Admins can easily find users and modify their information.

⚡ REST API Backend Backend built with Express.js providing secure APIs.

🛠 Tech Stack

Frontend

React.js

HTML5

CSS3

JavaScript

Axios

Backend

Node.js

Express.js

JWT Authentication

Database

MongoDB

Mongoose

🎯 How It Works 1️⃣ User Authentication

Users can register and login securely.

After login, a JWT token is generated for secure API access.

2️⃣ Admin Dashboard

Admins can:

View all users

Add new users

Update user information

Delete users

3️⃣ User Dashboard

Users can:

View profile information

Update their personal details

4️⃣ Database Management

MongoDB stores all:

User information

Login credentials

Role-based access data ⚙️ Installation / Setup 1️⃣ Clone the repository git clone https://github.com/shyamala-bodati/usermanagement-project.git 2️⃣ Install dependencies

Backend

cd backend npm install

Frontend

cd frontend npm install 3️⃣ Setup environment variables

Create a .env file inside backend:

PORT=5000 MONGO_URI=your_mongodb_connection JWT_SECRET=your_secret_key 4️⃣ Run the backend cd backend npm start 5️⃣ Run the frontend cd frontend npm run dev
