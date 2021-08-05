import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
		console.log('Before...'); // 라우터 핸들러 메소드 실행 전

		const now: number = Date.now();
		return next.handle().pipe(
			tap(
				// 라우터 핸들러 메소드 실행 후
				() => console.log(`After... ${Date.now() - now}ms`),
			),
		);
	}
}
