import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(ctx: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
		return next.handle().pipe(
			// 라우트 핸들러 메소드가 반환하는 response body의 데이터를 "data"라는 키값으로 wrapping
			map((data: T) => ({ data })),
		);
	}
}
