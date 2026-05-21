# 🚀 Project Management App

A full-stack **Project Management Application** built with **Django REST Framework**, **React + TypeScript**, **Tailwind CSS**, and **Docker**.

This application enables authenticated users to create and manage projects and tasks securely using JWT-based authentication with a clean modern dashboard UI.

---

# 📌 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication (SimpleJWT)
- Protected Routes
- Persistent auth using localStorage
- Logout functionality

---

## 📁 Project Management
- Create Project
- Fetch User Projects
- Delete Project
- View Project Details
- Project-specific task navigation
- Status management

Project Status:
- Active
- Completed

---

## 📝 Task Management
- Add Task
- Fetch Tasks
- Delete Task
- Filter Tasks by status
- Due date support
- Project-linked task organization

Task Status:
- Todo
- In Progress
- Done

---

## 🎨 Frontend Features
- Modern SaaS-style UI
- Fully responsive design
- Protected dashboard
- Task management page
- Context-based auth state
- Tailwind CSS styling
- Clean reusable routing structure

---

## ⚙️ Backend Features
- RESTful APIs
- JWT authentication
- CRUD operations
- Pagination
- Search & ordering
- Validation
- User-specific access control
- Django Admin panel
- Dockerized setup

---

# 🛠 Tech Stack

## Frontend
- React.js
- TypeScript
- Tailwind CSS
- Vite
- Axios
- React Router DOM

## Backend
- Python
- Django
- Django REST Framework
- SimpleJWT
- Django CORS Headers
- Django Filter

## Database
- SQLite (Development)
- PostgreSQL-ready architecture

## DevOps / Containerization
- Docker
- Docker Compose

---

# 📂 Project Structure

```bash
project-management-app/
│
├── backend/
│   ├── accounts/              # Authentication APIs
│   ├── projects/              # Project CRUD
│   ├── tasks/                 # Task CRUD
│   ├── config/                # Django config
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
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
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

---

# 🔐 Authentication Flow

1. User registers
2. User logs in
3. Backend returns JWT token
4. Token stored in localStorage
5. Axios automatically injects Authorization header
6. Protected routes validate session
7. Logout clears token

---

# 📡 API Endpoints

## Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register user |
| POST | `/api/auth/login/` | Login |
| POST | `/api/auth/refresh/` | Refresh token |

---

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/` | Fetch projects |
| POST | `/api/projects/` | Create project |
| GET | `/api/projects/:id/` | Single project |
| PUT | `/api/projects/:id/` | Update project |
| DELETE | `/api/projects/:id/` | Delete project |

---

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/tasks/` | Fetch project tasks |
| POST | `/api/projects/:id/tasks/` | Create task |
| DELETE | `/api/tasks/:id/` | Delete task |
| GET | `/api/projects/:id/tasks/?status=done` | Filter tasks |

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/project-management-app.git
cd project-management-app
```

---

# 🖥 Backend Setup

```bash
cd backend
python -m venv venv
```

### Windows
```bash
venv\Scripts\activate
```

### Linux / Mac
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create admin:

```bash
python manage.py createsuperuser
```

Start server:

```bash
python manage.py runserver
```

Backend:
```bash
http://localhost:8000
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:
```bash
http://localhost:5173
```

---

# 🐳 Docker Setup

Run complete app using Docker:

```bash
docker compose up --build
```

Frontend:
```bash
http://localhost:5173
```

Backend:
```bash
http://localhost:8000
```

Admin:
```bash
http://localhost:8000/admin
```

Stop containers:

```bash
docker compose down
```

Rebuild:

```bash
docker compose up --build
```

---

# 🧠 Concepts Implemented

- JWT Authentication
- Protected Routes
- React Context API
- CRUD Operations
- Project → Task relationship
- REST API design
- Axios interceptors
- Pagination
- Search & filtering
- User-based authorization
- Docker containerization
- Full-stack architecture
- TypeScript typing
- Responsive UI

---

# 🔒 Security

- JWT-based auth
- Protected frontend routes
- Authorization headers
- User-specific queryset filtering
- Secure password hashing
- Auth-protected APIs

---

# 📈 Future Improvements

- Edit Project
- Edit Task
- Kanban Board
- Dark Mode
- Notifications
- PostgreSQL container
- Nginx reverse proxy
- CI/CD GitHub Actions
- Unit + integration tests
- Role-based permissions

---

# Known Limitations

- SQLite used in development
- No task edit UI
- No project edit UI
- No refresh token rotation
- No file upload support

---

# 👨‍💻 Author

**Aditya**  
Python Developer | Full Stack Developer

GitHub: `https://github.com/Aditya2458`

---

# 📄 License

This project is created for learning, portfolio, and assessment purposes.