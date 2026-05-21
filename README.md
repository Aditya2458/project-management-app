# 🚀 ProjectFlow – Full Stack Project Management App

A modern full-stack **Project Management Application** built using **Django REST Framework**, **React + TypeScript**, **Tailwind CSS**, **JWT Authentication**, **Docker**, **Vercel**, and **Render**.

This app allows users to securely manage projects and tasks with authentication, protected routes, responsive UI, and RESTful APIs.

---

# 🌐 Live Demo

### Frontend (Vercel)
🔗 https://project-management-app-git-main-adityas-projects-ed3eaaae.vercel.app/register

### Backend (Render API)
🔗 https://project-management-app-1-n056.onrender.com

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Token-based Authorization
- Persistent Login (LocalStorage)
- Logout
- Protected Routes

---

## 📁 Project Management
- Create Project
- Fetch All Projects
- Delete Project
- Project Details View
- Status Tracking

### Project Status
- Active
- Completed

---

## 📝 Task Management
- Create Task
- Fetch Tasks
- Delete Task
- Task filtering
- Due dates
- Project-linked tasks

### Task Status
- Todo
- In Progress
- Done

---

## 🎨 Frontend
- Responsive UI
- React Router
- Protected navigation
- Context API authentication
- Tailwind CSS styling
- Reusable architecture
- SPA routing with Vercel rewrites

---

## ⚙️ Backend
- Django REST Framework
- JWT (SimpleJWT)
- CRUD APIs
- Pagination
- Search & Ordering
- User-specific data access
- Validation
- CORS support
- WhiteNoise static handling
- Production-ready config

---

# 🛠 Tech Stack

## Frontend
- React.js
- TypeScript
- Vite
- Axios
- React Router DOM
- Tailwind CSS

## Backend
- Python
- Django
- Django REST Framework
- SimpleJWT
- Django Filter
- WhiteNoise
- Gunicorn

## Database
- SQLite (development/demo)

## Deployment
- Vercel (Frontend)
- Render (Backend)
- Docker
- GitHub

---

# 📂 Folder Structure

```bash
project-management-app/
│
├── backend/
│   ├── accounts/                # Auth APIs
│   ├── projects/                # Project APIs
│   ├── tasks/                   # Task APIs
│   ├── config/                  # Django settings & urls
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ProjectDetails.tsx
│   │   ├── routes/
│   │   │   └── PrivateRoute.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🔐 Authentication Flow

1. User registers
2. User logs in
3. JWT token returned
4. Token stored in LocalStorage
5. Axios injects Authorization header
6. Protected routes validate session
7. User-specific project/task access

---

# 📡 API Endpoints

## Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register user |
| POST | `/api/auth/login/` | Login user |

---

## Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/` | Get projects |
| POST | `/api/projects/` | Create project |
| DELETE | `/api/projects/:id/` | Delete project |

---

## Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/tasks/` | Get project tasks |
| POST | `/api/projects/:id/tasks/` | Add task |
| DELETE | `/api/tasks/:id/` | Delete task |

---

# 🐳 Docker Setup

### Run locally
```bash
docker compose up --build
```

### Stop
```bash
docker compose down
```

---

# 💻 Local Development

## Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs on:
```bash
http://localhost:8000
```

---

## Frontend
```bash
cd frontend
npm install
npm run dev
```

Runs on:
```bash
http://localhost:5173
```

---

# 🔒 Security
- JWT-based authentication
- Protected frontend routes
- Authorization headers
- User-specific querysets
- Secure password hashing
- CORS handling

---

# 🧠 Concepts Used
- REST API Design
- Authentication & Authorization
- CRUD Operations
- React Context API
- Axios Interceptors
- Protected Routes
- SPA Routing
- Dockerization
- Full-stack deployment
- TypeScript typing
- Pagination
- Filtering
- Search & ordering

---

# 📈 Future Improvements
- Edit Project
- Edit Task
- Drag & Drop Kanban Board
- Dark Mode
- Notifications
- PostgreSQL
- Redis caching
- Role-based access
- Unit tests
- CI/CD pipeline

---

# ⚠ Known Limitations
- SQLite for demo environment
- No task edit UI
- No project edit UI
- No file uploads
- No refresh token rotation

---

# 👨‍💻 Author

**Aditya**  
Python Developer | Full Stack Developer

GitHub: https://github.com/Aditya2458

---

# ⭐ If you like this project
Give it a star on GitHub 🚀