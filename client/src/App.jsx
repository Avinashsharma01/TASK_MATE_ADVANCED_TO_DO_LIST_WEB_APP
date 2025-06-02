import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import TaskContext from "./context/TaskContext";
import { useAuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LandingPage from "./components/LandingPage";
import AuthContainer from "./components/auth/AuthContainer";
import "./App.css";

// Main app content when authenticated
const TaskApp = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const ReminderBanner = React.lazy(() =>
        import("./components/ReminderBanner")
    );

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

                <React.Suspense fallback={<div></div>}>
                    <ReminderBanner />
                </React.Suspense>

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

    // Function to expose TaskContext for debugging
    const exposeContextForDebug = (TaskContextObj) => {
        if (typeof window !== "undefined") {
            console.log("Exposing TaskContext for debugging");
            window.TaskContext = TaskContextObj;

            // Also import and expose the reminder service for easier debugging
            import("./services/reminderService")
                .then((module) => {
                    window.reminderService = module.default;
                    console.log("Reminder service exposed for debugging");
                })
                .catch((err) => {
                    console.error("Failed to expose reminder service:", err);
                });
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <TaskProvider>
                    {/* Expose context for testing */}
                    {exposeContextForDebug(TaskContext)}
                    <TaskApp />
                </TaskProvider>
            ) : (
                <LandingPage />
            )}
        </>
    );
};

const MainApp = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <AuthenticatedApp />

            {/* Only show simple footer when authenticated */}
            {isAuthenticated && (
                <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
                    <div className="container mx-auto">
                        <p>Task Mate - Your Advanced To-Do List App</p>
                    </div>
                </footer>
            )}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    );
};

export default App;
