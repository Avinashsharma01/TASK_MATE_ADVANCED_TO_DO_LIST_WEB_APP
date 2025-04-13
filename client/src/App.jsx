import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { useAuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import AuthContainer from "./components/auth/AuthContainer";
import "./App.css";

// Main app content when authenticated
const TaskApp = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen((prev) => !prev);
    };

    return (
        <>
            <main className="flex-1 container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Your Tasks
                    </h2>
                    <button
                        onClick={toggleForm}
                        className="btn btn-primary flex items-center"
                    >
                        {isFormOpen ? "Cancel" : "Add New Task"}
                    </button>
                </div>

                {isFormOpen && (
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Add New Task
                        </h3>
                        <TaskForm onClose={() => setIsFormOpen(false)} />
                    </div>
                )}

                <SearchBar />

                <TaskList />
            </main>
        </>
    );
};

// Wrapper to provide task context only when authenticated
const AuthenticatedApp = () => {
    const { isAuthenticated, loading } = useAuthContext();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            {isAuthenticated ? (
                <TaskProvider>
                    <TaskApp />
                </TaskProvider>
            ) : (
                <div className="flex-1 container mx-auto px-4 py-8">
                    <div className="max-w-md mx-auto">
                        <AuthContainer />
                    </div>
                </div>
            )}
        </>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                <Header />

                <AuthenticatedApp />

                <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
                    <div className="container mx-auto">
                        <p>Task Mate - Your Advanced To-Do List App</p>
                    </div>
                </footer>
            </div>
        </AuthProvider>
    );
};

export default App;
