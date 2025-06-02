import React, { useState, useEffect } from "react";
import { useTaskContext, PREDEFINED_CATEGORIES } from "../context/TaskContext";

const TaskForm = ({ task = null, onClose = null }) => {
    const { addTask, editTask } = useTaskContext();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        category: PREDEFINED_CATEGORIES[0], // Default to first category
        completed: false,
        reminder: {
            enabled: false,
            date: "",
            time: "12:00",
        },
    });
    const [error, setError] = useState("");
    useEffect(() => {
        if (task) {
            // Format the date to YYYY-MM-DD for input[type=date]
            let formattedDate = "";
            if (task.dueDate) {
                formattedDate = new Date(task.dueDate)
                    .toISOString()
                    .split("T")[0];
            }

            // Format reminder date and time if exists
            let reminderDate = "";
            let reminderTime = "12:00";

            if (task.reminder && task.reminder.date) {
                const reminderDateTime = new Date(task.reminder.date);
                reminderDate = reminderDateTime.toISOString().split("T")[0];

                const hours = reminderDateTime
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                const minutes = reminderDateTime
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                reminderTime = `${hours}:${minutes}`;
            }

            setFormData({
                title: task.title || "",
                description: task.description || "",
                dueDate: formattedDate,
                category: task.category || PREDEFINED_CATEGORIES[0],
                completed: task.completed || false,
                reminder: {
                    enabled: task.reminder?.enabled || false,
                    date: reminderDate,
                    time: reminderTime,
                },
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }

        try {
            // Process reminder data
            const processedData = { ...formData };
            if (formData.reminder.enabled && formData.reminder.date) {
                try {
                    // Combine date and time into a single Date object
                    const reminderDate = new Date(formData.reminder.date);
                    const [hours, minutes] = formData.reminder.time
                        .split(":")
                        .map(Number);

                    // Set hours, minutes, seconds, milliseconds explicitly
                    reminderDate.setHours(hours);
                    reminderDate.setMinutes(minutes);
                    reminderDate.setSeconds(0);
                    reminderDate.setMilliseconds(0);

                    console.log(
                        "Setting reminder for:",
                        reminderDate.toLocaleString()
                    );
                    console.log(
                        "Date in ISO format:",
                        reminderDate.toISOString()
                    );

                    // Create a proper valid date object
                    processedData.reminder = {
                        enabled: true,
                        date: reminderDate.toISOString(), // Store as ISO string for consistency
                        // Reset notified flag when creating/updating a reminder
                        notified: false,
                    };

                    // Debug log to check the object
                    console.log(
                        "Processed reminder data:",
                        JSON.stringify(processedData.reminder)
                    );
                } catch (error) {
                    console.error("Error processing reminder date:", error);
                    setError("Error setting reminder date. Please try again.");
                    throw error;
                }
            } else {
                processedData.reminder = {
                    enabled: false,
                };
            }

            // Remove the time field as it's not part of our schema
            delete processedData.reminder.time;

            if (task) {
                await editTask(task._id, processedData);
            } else {
                await addTask(processedData);
            }

            if (onClose) onClose();

            // Reset form if not in edit mode or if modal was not closed
            if (!task || !onClose) {
                setFormData({
                    title: "",
                    description: "",
                    dueDate: "",
                    category: PREDEFINED_CATEGORIES[0],
                    completed: false,
                    reminder: {
                        enabled: false,
                        date: "",
                        time: "12:00",
                    },
                });
            }

            setError("");
        } catch (err) {
            setError("Failed to save task", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="title" className="block font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Enter task title"
                />
            </div>
            <div>
                <label htmlFor="description" className="block font-medium mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input w-full h-24"
                    placeholder="Enter task description"
                ></textarea>
            </div>
            <div>
                <label htmlFor="dueDate" className="block font-medium mb-1">
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="input w-full"
                />
            </div>{" "}
            <div>
                <label htmlFor="category" className="block font-medium mb-1">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input w-full"
                >
                    {PREDEFINED_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="reminder-enabled"
                        checked={formData.reminder.enabled}
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                reminder: {
                                    ...prev.reminder,
                                    enabled: e.target.checked,
                                },
                            }));
                        }}
                        className="h-4 w-4 rounded text-primary"
                    />
                    <label htmlFor="reminder-enabled" className="font-medium">
                        Set reminder
                    </label>
                </div>

                {formData.reminder.enabled && (
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 pl-6">
                        <div className="flex-1">
                            <label
                                htmlFor="reminder-date"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Reminder date
                            </label>
                            <input
                                type="date"
                                id="reminder-date"
                                value={formData.reminder.date}
                                onChange={(e) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        reminder: {
                                            ...prev.reminder,
                                            date: e.target.value,
                                        },
                                    }));
                                }}
                                className="input w-full"
                                min={new Date().toISOString().split("T")[0]}
                                required={formData.reminder.enabled}
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <label
                                htmlFor="reminder-time"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Time
                            </label>
                            <input
                                type="time"
                                id="reminder-time"
                                value={formData.reminder.time}
                                onChange={(e) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        reminder: {
                                            ...prev.reminder,
                                            time: e.target.value,
                                        },
                                    }));
                                }}
                                className="input w-full"
                                required={formData.reminder.enabled}
                            />
                        </div>
                    </div>
                )}
            </div>
            {task && (
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="completed"
                        name="completed"
                        checked={formData.completed}
                        onChange={handleChange}
                        className="h-4 w-4 rounded text-primary"
                    />
                    <label htmlFor="completed" className="font-medium">
                        Mark as completed
                    </label>
                </div>
            )}
            <div className="flex justify-end space-x-2">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn btn-primary">
                    {task ? "Update Task" : "Add Task"}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
