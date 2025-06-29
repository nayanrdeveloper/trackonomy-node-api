import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './modules/user/user.routes';
import expenseRoutes from './modules/expense/expense.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
