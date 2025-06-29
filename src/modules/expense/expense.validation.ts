import { z } from 'zod';

export const createExpenseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    amount: z
        .number({ invalid_type_error: 'Amount must be a number' })
        .positive('Amount must be greater than zero'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Date must be a valid ISO string',
    }),
    transactionType: z.enum(['expense', 'income'], {
        errorMap: () => ({ message: 'Transaction type must be either "expense" or "income"' }),
    }),
    userId: z.number().int('User ID must be an integer'),
    fileUrl: z.string().url('File URL must be a valid URL').optional(),
});
