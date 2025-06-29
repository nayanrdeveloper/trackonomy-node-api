export type ExpenseInput = {
    title: string;
    description?: string;
    amount: number;
    date: string; // ISO format
    transactionType: 'expense' | 'income';
    userId: number;
    fileUrl?: string;
};
