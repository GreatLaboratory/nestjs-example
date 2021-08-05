import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		// ExecutionContext는 ArgumentsHost를 상속받는 클래스이다.
		const request = ctx.switchToHttp().getRequest();
		// 뽑아낸 request가 검증이 잘 된 request라면 true를 리턴하여 route handler로 넘긴다.
		return this.validateRequest(request);
	}

	validateRequest(request) {
		if (!request) return false;
		// 원래는 request header의 토큰값으로 validate검사를 한 후 user를 찾아서 request.user에 해당 user객체를 주입해야 한다.
		// 현재는 로그인 로직없이 이후 role에 대한 인가 처리를 위해 임시로 user 객체 주입
		request.user = {
			roles: ['guest'],
		};
		return true;
	}
}
