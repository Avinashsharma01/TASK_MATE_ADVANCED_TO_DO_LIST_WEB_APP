# Task Mate - Client Documentation

This is the frontend for Task Mate, a full-stack to-do list application with user authentication and task management features.

## Technology Stack

- **React**: Frontend library using Hooks and Context for state management
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests

## Project Structure

```
client/
├── src/
│   ├── components/         # UI components
│   │   ├── auth/           # Authentication-related components
│   │   │   ├── AuthContainer.jsx   # Container for auth forms
│   │   │   ├── LoginForm.jsx       # Login form
│   │   │   └── RegisterForm.jsx    # Registration form
│   │   ├── Header.jsx      # App header with user info and logout
│   │   ├── SearchBar.jsx   # Search and filter functionality
│   │   ├── TaskForm.jsx    # Form for creating/editing tasks
│   │   ├── TaskItem.jsx    # Individual task component
│   │   └── TaskList.jsx    # List of tasks
│   ├── context/            # React Context API for state management
│   │   ├── AuthContext.jsx # Authentication state management
│   │   └── TaskContext.jsx # Task state management
│   ├── services/           # API services
│   │   └── api.js          # Axios configuration and API calls
│   ├── App.jsx             # Main application component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles with Tailwind imports
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML entry point
├── postcss.config.js       # PostCSS configuration for Tailwind
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## Features

1. **User Authentication**:
   - Registration with email, username, and password
   - Login with email and password
   - JWT-based authentication
   - Protected routes for authenticated users

2. **Task Management**:
   - Create, read, update, and delete tasks
   - Mark tasks as completed
   - Each task includes title, description, due date, and category

3. **Search and Filtering**:
   - Search tasks by title or description
   - Filter tasks by predefined categories

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Authentication Flow

The application uses JWT (JSON Web Tokens) for authentication:

1. When a user logs in or registers, the server returns a JWT token
2. The token is stored in `localStorage`
3. All subsequent API requests include the token in the Authorization header
4. The `AuthContext` manages the authentication state and user information

```javascript
// Example of how the auth token is managed
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## State Management

### AuthContext

The `AuthContext` manages authentication state:

- User information
- Login/registration functionality
- Token management
- Authentication status checks

```javascript
// Example usage of AuthContext
const { user, login, logout, isAuthenticated } = useAuthContext();
```

### TaskContext

The `TaskContext` manages task-related state:

- Fetching tasks from the API
- Creating, updating, and deleting tasks
- Searching and filtering tasks
- Predefined categories

```javascript
// Example usage of TaskContext
const { tasks, addTask, removeTask, toggleTaskCompletion } = useTaskContext();
```

## API Integration

The `api.js` file configures Axios to communicate with the backend API:

- Base URL configuration
- Authentication header injection
- API endpoint functions for tasks and authentication

```javascript
// Example API call
const tasks = await getTasks({ search: 'project', category: 'Work' });
```

## Component Structure

### Authentication Components

- `AuthContainer`: Switches between login and register forms
- `LoginForm`: Handles user login
- `RegisterForm`: Handles user registration

### Task Components

- `TaskForm`: Form for adding and editing tasks
- `TaskList`: Renders a list of tasks
- `TaskItem`: Individual task component with actions
- `SearchBar`: Search and filtering interface

## Styling

The application uses TailwindCSS with custom configuration:

- Custom color palette in `tailwind.config.js`
- Utility classes for consistent styling
- Responsive design for mobile and desktop

## Deployment

To build the application for production:

```bash
npm run build
```

This will create optimized files in the `dist` directory that can be deployed to any static file hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a pull request

## Troubleshooting

- **Authentication issues**: Check the token in localStorage and verify that API requests include the correct Authorization header
- **API connection problems**: Verify the API_URL in `api.js` points to the correct backend server
- **Styling issues**: Make sure PostCSS and Tailwind are configured correctly
