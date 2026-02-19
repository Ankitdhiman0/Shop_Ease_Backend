⚙️ Device Compare – Backend

Device Compare Backend is a RESTful API built with Express and MongoDB that powers the Device Compare platform.
It handles authentication, role-based authorization (Admin & User), device management, and secure API communication.

🚀 Tech Stack

Core

Node.js

Express 5

MongoDB

Mongoose

Authentication & Security

JWT (jsonwebtoken)

bcrypt

cookie-parser

dotenv

Middleware & Utilities

cors

morgan

multer (file uploads)

nodemailer (email services)

🧠 Architecture Overview

RESTful API structure

MVC pattern (Controllers, Models, Routes)

Role-based access control (Admin & User)

JWT-based authentication

Secure password hashing with bcrypt

MongoDB for structured device and user data

🔐 Core Features

User Registration & Login

JWT Authentication

Role-based Authorization (Admin / User)

Add, Update, Delete Devices (Admin)

Compare Mobiles & Laptops

Image Upload Support (Multer)

Email Service Integration (Nodemailer)

Secure Cookie Handling

📦 Installation

Clone the repository:

git clone <your-backend-repo-url>
cd backend


Install dependencies:

npm install

▶️ Running the Server

Since no start script is defined in package.json, run:

node app.js


For development (recommended), you should install nodemon:

npm install --save-dev nodemon


Then add this script in package.json:

"scripts": {
  "dev": "nodemon app.js"
}


Run:

npm run dev

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173

📂 Suggested Project Structure
backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── app.js
│── .env
│── package.json

🔄 API Base URL
http://localhost:5000/api

👨‍💻 Author

//**Currently working on creating realtime otp based authentication system in this backend**

Ankit Dhiman
MERN Stack Developer
