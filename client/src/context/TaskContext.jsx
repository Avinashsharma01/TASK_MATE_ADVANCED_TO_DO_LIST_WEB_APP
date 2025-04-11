import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

// Predefined categories
export const PREDEFINED_CATEGORIES = [
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Education',
  'Finance',
  'Home',
  'Other'
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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
      setError('Failed to fetch tasks. Please try again.');
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
      setTasks(prevTasks => [addedTask, ...prevTasks]);
      return addedTask;
    } catch (err) {
      setError('Failed to add task. Please try again.');
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
      setTasks(prevTasks => 
        prevTasks.map(task => task._id === id ? updated : task)
      );
      return updated;
    } catch (err) {
      setError('Failed to update task. Please try again.');
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
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories actually used in tasks
  const getUsedCategories = () => {
    const uniqueCategories = new Set(tasks.map(task => task.category).filter(Boolean));
    return Array.from(uniqueCategories);
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [searchTerm, categoryFilter]);

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
    fetchTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext; 