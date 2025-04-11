# Task Mate - Server Documentation

This is the backend API for Task Mate, a full-stack to-do list application with user authentication and task management features.

## Technology Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM (Object Data Modeling) for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing library

## Project Structure

```
server/
├── controllers/         # Request handlers
│   ├── taskController.js  # Task CRUD operations
│   └── userController.js  # User authentication and profile
├── middleware/          # Express middleware
│   └── authMiddleware.js  # JWT authentication middleware
├── models/              # Mongoose data models
│   ├── Task.js           # Task model schema
│   └── User.js           # User model schema
├── routes/              # Express route definitions
│   ├── taskRoutes.js     # Task API endpoints
│   └── userRoutes.js     # Authentication endpoints
├── .env                 # Environment variables (not in git)
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── package-lock.json    # Package lock file
└── server.js            # Main application entry point
```

## API Endpoints

### Authentication

- **POST /api/users/register** - Register a new user
  - Request body: `{ username, email, password }`
  - Response: `{ id, username, email, token }`

- **POST /api/users/login** - Login user
  - Request body: `{ email, password }`
  - Response: `{ id, username, email, token }`

- **GET /api/users/profile** - Get user profile (requires authentication)
  - Headers: `Authorization: Bearer [token]`
  - Response: `{ _id, username, email }`

### Tasks

All task endpoints require authentication with a valid JWT token.

- **GET /api/tasks** - Get all tasks for the authenticated user
  - Query params: `search`, `category` (optional)
  - Headers: `Authorization: Bearer [token]`
  - Response: Array of task objects

- **POST /api/tasks** - Create a new task
  - Headers: `Authorization: Bearer [token]`
  - Request body: `{ title, description, dueDate, category }`
  - Response: Created task object

- **GET /api/tasks/:id** - Get task by ID
  - Headers: `Authorization: Bearer [token]`
  - Response: Task object

- **PUT /api/tasks/:id** - Update a task
  - Headers: `Authorization: Bearer [token]`
  - Request body: Task fields to update
  - Response: Updated task object

- **DELETE /api/tasks/:id** - Delete a task
  - Headers: `Authorization: Bearer [token]`
  - Response: `{ message: "Task deleted successfully" }`

## Authentication Flow

Authentication is handled using JWT (JSON Web Tokens):

1. When a user registers or logs in, the server generates a JWT token
2. The token contains the user's ID and is signed with a secret key
3. For protected routes, the `authMiddleware.js` verifies the token
4. The user ID is extracted from the token and added to the request object
5. Each task operation is restricted to the authenticated user's tasks

## Data Models

### User Model

```javascript
{
  username: String,  // Required, unique, min length 3
  email: String,     // Required, unique
  password: String,  // Required, min length 6 (stored hashed)
  createdAt: Date,   // Auto-generated timestamp
  updatedAt: Date    // Auto-updated timestamp
}
```

### Task Model

```javascript
{
  title: String,         // Required
  description: String,   // Optional
  dueDate: Date,         // Optional
  category: String,      // Optional
  completed: Boolean,    // Default: false
  userId: ObjectId,      // Reference to User model, required
  createdAt: Date,       // Auto-generated timestamp
  updatedAt: Date        // Auto-updated timestamp
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository and navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskMateDB
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## Security Features

1. **Password Hashing**: User passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Secure, stateless authentication using signed tokens
3. **Protected Routes**: All task operations require valid authentication
4. **User Data Isolation**: Users can only access their own tasks

## Error Handling

The API includes comprehensive error handling:

- Validation errors for user input
- Authentication and authorization errors
- Database operation errors
- Appropriate HTTP status codes for different error types

## Deployment

For production deployment:

1. Set appropriate environment variables for production
2. Consider using a process manager like PM2
3. Set up proper MongoDB security (authentication, network security)
4. Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a pull request

## Troubleshooting

- **Database connection issues**: Check your MongoDB connection string and ensure the database server is running
- **Authentication problems**: Verify the JWT_SECRET is consistent and tokens are being properly generated
- **CORS errors**: Make sure the CORS middleware is properly configured for your frontend origin 