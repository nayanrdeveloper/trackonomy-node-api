import { Request, Response } from 'express';

import userService from './user.service';

const createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.json(user);
};

export default { createUser };
