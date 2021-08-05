import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	ForbiddenException,
	UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError(
				// 예외를 던지는 응답을 주시하다가 ForbiddenException 예외를 발견하면 이를 UnauthorizedException으로 변환한다.
				// UsersController의 findAll() 메소드는 ForbiddenException 예외를 던지고 있지기 때문에 해당 인터셉터로 인해 UnauthorizedException을 던지게 된다.
				// UsersController의 create() 메소드는 현재 Guard에 의해 ForbiddenException 예외를 던지고 있긴 하지만
				// 처리 순서가 middleware -> guard -> interceptor//filter 이기 때문에 해당 interceptor까지 도달하므로 변환되지 않는다.
				(err) => {
					if (err instanceof ForbiddenException) {
						return throwError(() => new UnauthorizedException());
					}
					return throwError(() => err);
				},
			),
		);
	}
}
