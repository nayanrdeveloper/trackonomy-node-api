import express from 'express';
import bcrypt from 'bcrypt';

import prisma from '../../config/db';
import { generateToken } from '../../utils/auth.util';
import { ApiError } from '../../errors/ApiError';

const router = express.Router();

// ✅ Register User
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new ApiError(400, 'User already exists');

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });

        const token = generateToken({ id: user.id, name: user.name });

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

// ✅ Login User
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true, // 👈 necessary for bcrypt
            },
        });

        if (!user) throw new ApiError(400, 'Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new ApiError(400, 'Invalid credentials');

        const token = generateToken({ id: user.id, name: user.name });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

export default router;
