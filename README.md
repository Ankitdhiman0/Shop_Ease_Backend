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

//then add products and by acccessing the website as admin (for accessing the website as admin firstly, register as a normal user and then open the database like atlas or compass then go to shop-ease database -> users collection -> every user has a field called isAdmin === "false" change this value to true) then delete all the already existing carousels and then register a new carousel max limit upto = 5, every image will contains a url by clicking and image on carousel you will redirect to the attached url.

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

or you can change the port number as you want in .env file

👨‍💻 Author

//**Currently working on attaching realtime otp based authentication system in this backend**

Ankit Dhiman
MERN Stack Developer
