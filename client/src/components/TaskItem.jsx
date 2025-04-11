import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from './TaskForm';

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
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
        <TaskForm 
          task={task} 
          onClose={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
      task.completed ? 'border-green-500' : 'border-yellow-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompletion}
            className="h-5 w-5 rounded text-primary mt-1"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
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
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 