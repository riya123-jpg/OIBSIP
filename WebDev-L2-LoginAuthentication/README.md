Login Authentication System

This project is a simple full-stack login authentication system built for my internship task. I built it to understand the complete flow between a frontend form, an Express backend, authentication, sessions, and data storage.

Tech Stack

Frontend

HTML

CSS

Vanilla JavaScript

Backend

Node.js

Express.js

bcrypt

express-session

Storage

JSON file

User data is stored in backend/src/data/users.json. Passwords are not stored as plain text; bcrypt hashes are stored instead.

What this project does

The application has three main pages:

Register – users can create an account with a username, email, and password.

Login – users can log in using either their username or email.

Dashboard – only authenticated users can access it and view their account information.

There is also a logout option that destroys the current session and sends the user back to the login page.

Features

Registration with username, email, and password

Empty field validation

Password validation: minimum 8 characters and at least 1 number

Duplicate username/email checking

Password hashing with bcrypt

Login with username or email

Generic error message for invalid credentials

Session-based authentication using Express Session

Protected dashboard route

Current logged-in user details

Logout and session destruction

Redirect to login when an unauthenticated user tries to open the dashboard

Project Structure

LoginAuthentication/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── data/
│ │ │ ├── user.data.js
│ │ │ └── users.json
│ │ ├── middleware/
│ │ ├── models/
│ │ │ └── user.model.js
│ │ ├── routes/
│ │ │ └── auth.routes.js
│ │ └── app.js
│ │
│ ├── .env
│ ├── package.json
│ └── server.js
│
├── frontend/
│ ├── pages/
│ │ ├── register.html
│ │ ├── login.html
│ │ └── dashboard.html
│ │
│ ├── css/
│ │ ├── register.css
│ │ ├── login.css
│ │ └── dashboard.css
│ │
│ └── js/
│ ├── register.js
│ ├── login.js
│ └── dashboard.js
│
└── README.md

Authentication Flow

Registration

The user fills out the registration form and the frontend sends the data to the backend with a POST request.

The backend then:

Validates the submitted fields.

Checks the password requirements.

Checks whether the username or email already exists.

Hashes the password using bcrypt.

Creates the user object.

Saves the user in users.json.

Login

The user can enter either a username or an email along with the password.

The backend finds the user and uses bcrypt.compare() to verify the password against the stored hash. When the credentials are correct, the user's ID is saved in the session.

Invalid credentials always return the same message instead of telling the user whether the username/email or password was wrong.

Protected Dashboard

When the dashboard loads, the frontend requests the current user from the backend.

The authentication middleware checks whether a valid session exists. If there is no authenticated session, the request is rejected and the frontend redirects the user to the login page.

Logout

The logout request destroys the current session. After logout, the user is redirected to the login page and can no longer access the protected dashboard without logging in again.

API Endpoints

Method

Endpoint

Purpose

POST

/api/auth/register

Register a new user

POST

/api/auth/login

Log in a user

GET

/api/auth/me

Get the currently authenticated user

POST

/api/auth/logout

Destroy the current session

Running the Project

Start the backend

Open a terminal inside the backend folder and run:

npm install
npm run dev

The backend runs on:

http://localhost:3000

Run the frontend

Open the frontend through a local development server such as VS Code Live Server.

Make sure the frontend origin matches the CORS configuration in the backend because the application uses session cookies.

Environment Variables

Create a .env file inside the backend folder:

PORT=3000
SESSION_SECRET=your_secret_key_here

The .env file should not be committed to Git.

What I Practiced in This Project

This project helped me practice the complete authentication cycle instead of only working on the UI. The main concepts covered are Express routing, controllers, middleware, password hashing, sessions, API integration with fetch(), validation, protected routes, and frontend/backend communication.

Note

This project uses a JSON file because the internship task allows a simple JSON/SQLite storage approach. It is intended for learning and internship evaluation. A production authentication system would normally use a proper database, HTTPS, secure cookie settings, and production-grade session/password security practices.
