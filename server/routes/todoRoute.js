import express from 'express';
import { createTodo, getUserTodos, updateTodo, deleteTodo } from '../controllers/todoControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(createTodo).get(getUserTodos);
router.route('/:id').put(updateTodo).delete(deleteTodo);

export default router;