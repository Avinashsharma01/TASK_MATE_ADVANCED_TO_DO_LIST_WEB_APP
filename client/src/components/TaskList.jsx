import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, loading, error } = useTaskContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded my-4">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-gray-100 text-gray-600 p-8 rounded-lg text-center my-4">
        <p className="text-lg">No tasks found.</p>
        <p className="mt-2">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList; 