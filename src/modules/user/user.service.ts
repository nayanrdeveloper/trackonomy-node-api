import prisma from '../../config/db';

import { UserInput } from './user.types';

const createUser = (data: UserInput) => {
    return prisma.user.create({ data });
};

export default { createUser };
