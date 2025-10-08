
# 🛡️ Password Manager (Mongo-App Version)

A lightweight password manager built using **React + Vite** for the frontend and **Express + MongoDB** for the backend. This application helps you store, manage, and retrieve passwords easily.

- ➕ Add passwords  
- ✏️ Edit passwords  
- ❌ Delete passwords  
- ✅ Mark passwords as used/finished  
- 📂 View all saved passwords  

All data is stored in **Database**, so your passwords remain even after refreshing or closing the browser.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features

- Add, update, and delete passwords.  
- Store credentials securely in MongoDB.  
- Search and filter saved passwords.  
- Responsive UI with React + Vite.  
- Environment configuration using dotenv.  

---

## Tech Stack

- **Frontend:** React + Vite  
- **Backend:** Express.js, Node.js  
- **Database:** MongoDB  
- **Environment Management:** dotenv  
- **Others:** Axios (for API requests)

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ansh-tyagi11/Password-Manager.git
cd  Password-Manager
cd  mongo-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ..
npm install
```

---

## Environment Variables

Create a `.env` file in the `backend` folder and add:

```env
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_database_name
```

**Optional:** Add frontend variables in `.env` inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Usage

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd ..
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

| Method | Endpoint                | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/`       | Get all saved passwords      |
| POST   | `/`       | Add a new password           |
| DELETE    | `/deleteAll`   | Delete all passwords            |
| DELETE | `/`   | Delete a password            |

---

## Folder Structure

```
Password-Manager/
mongo-app/
├── backend/
│   ├── .env
│   ├── server.js
│   └── package.json
├── public/
│   └──favicon.png
├── assests/
│   └──logo.png
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Manager.jsx
│   │   └── Navbar.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.jsx
│   └── main.jsx
├──.gitignore
├──eslint.config.js
├──package-lock.json
├──package.json
├──README.md   
└── vite.config.js
```

---

## Contributing

1. Fork the repository.  
2. Create your feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m 'Add some feature'`  
4. Push to the branch: `git push origin feature/YourFeature`  
5. Open a pull request.

---

## License

This project is licensed under the MIT License.  

---

**Made with ❤️ by Ansh Tyagi**
