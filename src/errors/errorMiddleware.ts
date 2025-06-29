import { Request, Response, NextFunction } from 'express';

import { ApiError } from './ApiError';
import { errorConverter, errorResponder } from './errorHandler.util';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error = errorConverter(err);
    errorResponder(error, res);
};
