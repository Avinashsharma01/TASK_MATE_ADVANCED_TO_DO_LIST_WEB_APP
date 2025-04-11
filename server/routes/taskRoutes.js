import express from 'express';
import { 
  getTasks, 
  createTask, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect middleware to all task routes
router.use(protect);

// GET all tasks and POST new task
router.route('/')
  .get(getTasks)
  .post(createTask);

// GET, PUT, DELETE task by ID
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router; 