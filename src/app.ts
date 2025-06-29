import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './modules/user/user.routes';
import expenseRoutes from './modules/expense/expense.routes';
import { errorHandler } from './errors/errorMiddleware';
import { notFoundHandler } from './middlewares/notFoundMiddleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Register your routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// ✅ 404 handler if no route matches
app.use(notFoundHandler);

// ✅ Central error handler (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
