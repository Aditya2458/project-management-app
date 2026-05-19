# 🚀 Project Management App

A full-stack Project Management Application built using **Django REST Framework**, **React.js**, **TypeScript**, and **Tailwind CSS**.  
This app allows authenticated users to manage projects and tasks with secure JWT-based authentication.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Token-based session handling
- Logout functionality

### 📁 Projects
- Create Project
- Fetch User Projects
- Delete Project
- View project-specific tasks
- Project status:
  - Active
  - Completed

### 📝 Tasks
- Create Task
- Fetch Tasks
- Delete Task
- Filter Tasks by status
- Task status:
  - Todo
  - In Progress
  - Done
- Due date support

### 🎨 Frontend
- Modern responsive UI
- Tailwind CSS styling
- Dashboard
- Task details page
- Form handling
- Protected navigation

### ⚙️ Backend
- RESTful APIs
- Django REST Framework
- JWT auth using SimpleJWT
- Validation
- Pagination
- Search & ordering
- User-specific data access
- Django Admin Panel

---

# 🛠 Tech Stack

## Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Vite

## Backend
- Python
- Django
- Django REST Framework
- SimpleJWT
- CORS Headers

## Database
- SQLite (development)
- PostgreSQL compatible

---

# 📂 Project Structure

```bash
project-management-app/
│
├── backend/
│   ├── accounts/              # Auth APIs
│   ├── projects/              # Project CRUD
│   ├── tasks/                 # Task CRUD
│   ├── config/                # Django settings & routes
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ProjectDetails.tsx
│   │   │
│   │   ├── routes/
│   │   │   └── PrivateRoute.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

# 🔑 Authentication Flow

1. User registers
2. User logs in
3. Backend returns JWT access token
4. Token stored in localStorage
5. Axios interceptor automatically injects token
6. Protected routes validate auth
7. Logout clears token

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register user |
| POST | `/api/auth/login/` | Login |
| POST | `/api/auth/refresh/` | Refresh token |

---

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/` | Get all user projects |
| POST | `/api/projects/` | Create project |
| GET | `/api/projects/:id/` | Get single project |
| PUT | `/api/projects/:id/` | Update project |
| DELETE | `/api/projects/:id/` | Delete project |

---

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/tasks/` | Get project tasks |
| POST | `/api/projects/:id/tasks/` | Create task |
| DELETE | `/api/tasks/:id/` | Delete task |
| GET | `/api/projects/:id/tasks/?status=done` | Filter tasks |

---

# ⚡ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/project-management-app.git
cd project-management-app
```

---

# 🖥 Backend Setup

## Go to backend

```bash
cd backend
```

## Create virtual environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

## Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Create superuser

```bash
python manage.py createsuperuser
```

---

## Start backend server

```bash
python manage.py runserver
```

Backend runs at:

```bash
http://127.0.0.1:8000/
```

---

# 💻 Frontend Setup

## Go to frontend

```bash
cd ../frontend
```

---

## Install packages

```bash
npm install
```

---

## Start frontend

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173/
```

---

# 🔐 Demo Flow

### Register
- Create new account

### Login
- Authenticate with JWT

### Dashboard
- Create project
- View projects
- Delete project
- Navigate to task page

### Project Details
- Add task
- Delete task
- Filter tasks

---

# 🧠 Key Concepts Used

- JWT Authentication
- Axios Interceptors
- Protected Routes
- React Context API
- CRUD Operations
- Relational Data (Project → Tasks)
- TypeScript typing
- REST API design
- User-based authorization
- Tailwind responsive UI
- DRF pagination
- Search & ordering

---

# 🔒 Security

- JWT auth
- Protected frontend routes
- User-specific queryset filtering
- Secure password hashing (Django)
- Authorization headers
- Auth-protected CRUD endpoints

---

# 📈 Future Improvements

- Edit Project
- Edit Task
- Drag & Drop Kanban Board
- Dark Mode
- Notifications
- Role-based permissions
- PostgreSQL production config
- Docker support
- Deployment pipeline
- Unit testing (Jest + Pytest)

---

# Known Limitations

- No project editing UI yet
- No task editing UI
- SQLite used for development
- No refresh token auto-rotation
- No file attachments

---

# 👨‍💻 Author

**Aditya**  
Python Developer | Full Stack Developer

GitHub: https://github.com/YOUR_USERNAME

---

# 📄 License

This project is for educational / assessment purposes.  