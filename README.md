⚙️ Shop-Ease – Backend

<<<<<<< HEAD
Shop-Ease Backend is a RESTful API built with Express and MongoDB that powers the Shop-Ease platform.
It handles authentication, role-based authorization (Admin & User, Seller), device management, and secure API communication.
=======
Device Compare Backend is a RESTful API built with Express and MongoDB that powers the Shop-Ease platform.
It handles authentication, role-based authorization (Admin & User), device management, and secure API communication.
>>>>>>> aa86cf66293bf3efe822fe61ac49b538efbd08e9

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

Read Products, User, their orders (Admin)

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

nodemon app.js

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET

//then add products and by acccessing the website as admin (for accessing the website as admin firstly, register as a normal user and then open the database like atlas or compass then go to shop-ease database -> users collection -> every user has a field called isAdmin === "false" change this value to true) then delete all the already existing carousels and then register a new carousel max limit upto = 5, every image will contains a url by clicking and image on carousel you will redirect to the attached url.

MAIL_PASS
MAIL_FROM="Shop-Ease <email@gmail.com>"
MAIL_PORT=587
MAIL_HOST
MAIL_USER

📂 Suggested Project Structure
backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── utils/
│── app.js
│── .env
│── package.json

🔄 API Base URL
http://localhost:5000/shop-ease

or you can change the port number as you want in .env file

👨‍💻 Author

//**Currently working on attaching realtime otp based authentication system in this backend**

Ankit Dhiman
MERN Stack Developer
