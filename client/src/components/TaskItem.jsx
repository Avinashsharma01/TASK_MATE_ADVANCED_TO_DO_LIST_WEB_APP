import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";

const TaskItem = ({ task }) => {
    const { toggleTaskCompletion, removeTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);

    const handleToggleCompletion = async () => {
        await toggleTaskCompletion(task._id, task.completed);
    };

    const handleDelete = async () => {
        await removeTask(task._id);
        // if (window.confirm('Are you sure you want to delete this task?')) {
        //   await removeTask(task._id);
        // }
    };

    // Format the date to a readable string
    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
                <TaskForm task={task} onClose={() => setIsEditing(false)} />
            </div>
        );
    }

    return (
        <div
            className={`bg-white p-4 rounded-lg shadow border-l-4 ${
                task.completed ? "border-green-500" : "border-yellow-500"
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggleCompletion}
                        className="h-5 w-5 rounded text-primary mt-1"
                    />
                    <div className="flex-1">
                        <h3
                            className={`text-lg font-semibold ${
                                task.completed
                                    ? "line-through text-gray-500"
                                    : ""
                            }`}
                        >
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className="text-gray-600 mt-1">
                                {task.description}
                            </p>
                        )}{" "}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {task.dueDate && (
                                <span className="inline-flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                    Due: {formatDate(task.dueDate)}
                                </span>
                            )}
                            {task.category && (
                                <span className="inline-flex items-center text-sm bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                                    {task.category}
                                </span>
                            )}
                            {task.reminder &&
                                task.reminder.enabled &&
                                task.reminder.date && (
                                    <span className="inline-flex items-center text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4 mr-1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Reminder:{" "}
                                        {formatDate(task.reminder.date)}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className=" text-white bg-blue-600 px-2.5 py-1 rounded-md hover:text-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-white bg-red-600 px-2.5 py-1 rounded-md hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
