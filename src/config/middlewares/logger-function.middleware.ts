import { Request, Response, NextFunction } from 'express';

export const loggerFunctionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log('[loggerFunctionMiddleware] Request url : ', req.originalUrl);
	next();
};
