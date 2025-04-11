import React, { useState, useEffect } from 'react';
import { useTaskContext, PREDEFINED_CATEGORIES } from '../context/TaskContext';

const TaskForm = ({ task = null, onClose = null }) => {
  const { addTask, editTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: PREDEFINED_CATEGORIES[0], // Default to first category
    completed: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      // Format the date to YYYY-MM-DD for input[type=date]
      let formattedDate = '';
      if (task.dueDate) {
        formattedDate = new Date(task.dueDate).toISOString().split('T')[0];
      }
      
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: formattedDate,
        category: task.category || PREDEFINED_CATEGORIES[0],
        completed: task.completed || false
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      if (task) {
        await editTask(task._id, formData);
      } else {
        await addTask(formData);
      }
      
      if (onClose) onClose();
      
      // Reset form if not in edit mode or if modal was not closed
      if (!task || !onClose) {
        setFormData({
          title: '',
          description: '',
          dueDate: '',
          category: PREDEFINED_CATEGORIES[0],
          completed: false
        });
      }
      
      setError('');
    } catch (err) {
      setError('Failed to save task');
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
      </div>
      
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
          {PREDEFINED_CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 