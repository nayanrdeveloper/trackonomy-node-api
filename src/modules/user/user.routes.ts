import { Router } from 'express';

import validate from '../../middlewares/validate';

import userController from './user.controller';
import { createUserSchema } from './user.validation';

const router = Router();
router.post('/', validate(createUserSchema), userController.createUser);

export default router;
