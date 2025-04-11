# Task Mate - Advanced To-Do List Web App

Task Mate is a full-stack web application for managing your tasks efficiently. It provides user authentication, task management, search, and filtering functionality with a clean, modern interface.

![Task Mate Screenshot](https://via.placeholder.com/800x450?text=Task+Mate+Screenshot)

## Features

- **User Authentication**:
  - Secure registration and login
  - JWT-based authentication
  - User-specific task management

- **Task Management**:
  - Create, read, update, and delete tasks
  - Mark tasks as completed
  - Task details include title, description, due date, and category

- **Search and Filtering**:
  - Search tasks by title or description
  - Filter tasks by predefined categories

- **User Interface**:
  - Clean, responsive design
  - Mobile-friendly layout
  - Modern styling with TailwindCSS

## Tech Stack

### Frontend
- React with Vite
- TailwindCSS for styling
- Axios for API requests
- React Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
/
├── client/             # React frontend
├── server/             # Node.js backend
└── README.md           # This file
```

For detailed documentation:
- [Client Documentation](client/README.md)
- [Server Documentation](server/README.md)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd task-mate
```

2. Set up the backend:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskMateDB
JWT_SECRET=your_jwt_secret_key_here
```

4. Set up the frontend:
```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Register/Login**: Create an account or log in with existing credentials
2. **Add Tasks**: Click "Add New Task" to create a new task
3. **Manage Tasks**: View, edit, delete, or mark tasks as completed
4. **Search/Filter**: Use the search bar to find specific tasks or filter by category

## API Overview

The backend provides a RESTful API:

- **Authentication**: `/api/users/register`, `/api/users/login`, `/api/users/profile`
- **Tasks**: `/api/tasks` with GET, POST, PUT, DELETE operations

All task endpoints are protected and require authentication.

## Deployment

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to a static file hosting service.

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a pull request 