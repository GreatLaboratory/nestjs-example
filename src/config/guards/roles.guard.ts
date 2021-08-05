import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const roles: string[] = this.reflector.get<string[]>('roles', ctx.getHandler());
		if (!roles) return true; // 라우트 핸들러에 @Roles()가 없다면 아무나 접근 가능한 핸들러이다.

		const request = ctx.switchToHttp().getRequest();
		const user = request.user;
		return this.matchRoles(roles, user.roles);
	}

	matchRoles(allowRoles: string[], userRoles: string[]) {
		for (const userRole of userRoles) {
			if (allowRoles.includes(userRole)) {
				return true;
			}
		}
		return false;
	}
}
