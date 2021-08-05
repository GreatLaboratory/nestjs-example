import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
	intercept(ctx: ExecutionContext, next: CallHandler) {
		// 만약 캐싱된 데이터라면(ctx를 사용하여 판단) (현재는 임시로 true)
		const isCached: boolean = true;
		if (isCached) {
			// 해당 stream의 response를 []으로 반환하고 라우트 핸들러 메소드를 실행시키지 않는다.
			return of([]);
		}
		// 라우터 핸들러 메소드를 실행시키러 간다.
		return next.handle();
	}
}
