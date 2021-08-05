import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class loggerClassMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('[loggerClassMiddleware] Request url : ', req.originalUrl);
		next();
	}
}
