import prisma from '../../config/db';
import { ExpenseInput } from './expense.types';

const createExpense = (data: ExpenseInput) => {
  return prisma.expense.create({ data });
};

const getExpensesByUser = (userId: number) => {
  return prisma.expense.findMany({ where: { userId } });
};

export default { createExpense, getExpensesByUser };
