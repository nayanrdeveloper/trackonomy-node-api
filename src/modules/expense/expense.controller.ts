import { Request, Response } from 'express';
import expenseService from './expense.service';

const createExpense = async (req: Request, res: Response) => {
  const expense = await expenseService.createExpense(req.body);
  res.json(expense);
};

const getUserExpenses = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const expenses = await expenseService.getExpensesByUser(userId);
  res.json(expenses);
};

export default { createExpense, getUserExpenses };
