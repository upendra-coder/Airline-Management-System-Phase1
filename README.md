# ✈️ Airline Management System (Phase 1)

> A full-stack flight reservation platform engineered with React.js and Node.js, featuring secure authentication and role-based dashboards.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens)

## 📖 Overview
This project serves as the foundational architecture for an airline booking system. It creates a clear separation between **Admin** operations (flight scheduling, fleet management) and **User** operations (search, booking, history). The system is built on a RESTful API architecture ensuring stateless communication.

## 🚀 Key Features
* **🔐 Secure Authentication:** Stateless User and Admin sessions using **JSON Web Tokens (JWT)**.
* **👤 Interactive User Dashboard:** Search flights, view booking history, and manage profile details.
* **🛠️ Admin Control Panel:** Complete CRUD capabilities for managing flight schedules and passenger manifests.
* **📡 RESTful API:** clean and documented endpoints for client-server communication.

## 🛠️ Tech Stack
* **Frontend:** React.js, React Router, CSS Modules
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Local/Atlas) *[Or MySQL if you used that in Phase 1]*
* **Auth:** BCrypt (hashing), JWT

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/upendra-coder/Airline-Management-System-Phase1.git](https://github.com/upendra-coder/Airline-Management-System-Phase1.git)
    cd Airline-Management-System-Phase1
    ```

2.  **Install Dependencies**
    ```bash
    # For Server
    cd server
    npm install

    # For Client
    cd ../client
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `server` folder:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4.  **Run the App**
    ```bash
    # Terminal 1 (Server)
    cd server
    npm start

    # Terminal 2 (Client)
    cd client
    npm start
    ```
