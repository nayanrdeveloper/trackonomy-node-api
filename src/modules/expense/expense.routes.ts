import { Router } from 'express';

import validate from '../../middlewares/validate';

import expenseController from './expense.controller';
import { createExpenseSchema } from './expense.validation';

const router = Router();
router.post('/', validate(createExpenseSchema), expenseController.createExpense);
router.get('/user/:userId', expenseController.getUserExpenses);

export default router;
