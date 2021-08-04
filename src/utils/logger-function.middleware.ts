import { Request, Response, NextFunction } from 'express';

export const loggerFunctionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log('Request url : ', req.originalUrl);
	next();
};
