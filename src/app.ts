import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from '../src/modules/auth/auth.routes';

import userRoutes from './modules/user/user.routes';
import expenseRoutes from './modules/expense/expense.routes';
import { errorHandler } from './errors/errorMiddleware';
import { notFoundHandler } from './middlewares/notFoundMiddleware';
import { authMiddleware } from './middlewares/auth.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// ✅ Register your routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/expenses', authMiddleware, expenseRoutes);

// ✅ 404 handler if no route matches
app.use(notFoundHandler);

// ✅ Central error handler (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
