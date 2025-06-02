/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import reminderService from "../services/reminderService";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

// Predefined categories
export const PREDEFINED_CATEGORIES = [
    "Work",
    "Personal",
    "Shopping",
    "Health",
    "Education",
    "Finance",
    "Home",
    "Other",
];

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    // Fetch tasks with search and filter
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const searchParams = {};

            if (searchTerm) searchParams.search = searchTerm;
            if (categoryFilter) searchParams.category = categoryFilter;

            const data = await getTasks(searchParams);
            setTasks(data);
        } catch (err) {
            setError("Failed to fetch tasks. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add a new task
    const addTask = async (newTask) => {
        try {
            setLoading(true);
            setError(null);
            const addedTask = await createTask(newTask);
            setTasks((prevTasks) => [addedTask, ...prevTasks]);
            return addedTask;
        } catch (err) {
            setError("Failed to add task. Please try again.");
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update an existing task
    const editTask = async (id, updatedTask) => {
        try {
            setLoading(true);
            setError(null);
            const updated = await updateTask(id, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === id ? updated : task))
            );
            return updated;
        } catch (err) {
            setError("Failed to update task. Please try again.");
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Toggle completion status
    const toggleTaskCompletion = async (id, currentStatus) => {
        return editTask(id, { completed: !currentStatus });
    };

    // Remove a task
    const removeTask = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deleteTask(id);
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== id)
            );
        } catch (err) {
            setError("Failed to delete task. Please try again.");
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories actually used in tasks
    const getUsedCategories = () => {
        const uniqueCategories = new Set(
            tasks.map((task) => task.category).filter(Boolean)
        );
        return Array.from(uniqueCategories);
    }; // Initialize reminder service
    useEffect(() => {
        // Keep track of initialization state
        let isInitialized = false;

        const initializeReminders = async () => {
            // Only initialize once with tasks present
            if (!isInitialized && tasks.length > 0) {
                console.log(
                    "Initializing reminder service with tasks:",
                    tasks.length
                );
                isInitialized = true;

                // Request notification permission
                const permissionGranted =
                    await reminderService.requestPermission();
                console.log(
                    "Notification permission granted:",
                    permissionGranted
                );

                if (permissionGranted) {
                    // Start reminder service with a function that will always return the latest tasks
                    reminderService.start(() => {
                        console.log(
                            "Reminder service accessing tasks:",
                            tasks.length
                        );
                        return tasks;
                    });
                } else {
                    console.log(
                        "Reminders disabled: notification permission not granted"
                    );
                }
            }
        };

        initializeReminders();

        // Clean up reminder service on unmount
        return () => {
            console.log("Cleaning up reminder service");
            reminderService.stop();
        };
    }, [tasks]);

    // Initial fetch
    useEffect(() => {
        fetchTasks();
    }, [searchTerm, categoryFilter]);

    // Enable reminders
    const enableReminders = async () => {
        const granted = await reminderService.requestPermission();
        return granted;
    };

    const value = {
        tasks,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        addTask,
        editTask,
        removeTask,
        toggleTaskCompletion,
        getUsedCategories,
        fetchTasks,
        enableReminders,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
};

export default TaskContext;
