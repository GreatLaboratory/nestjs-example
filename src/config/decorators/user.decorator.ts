import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
	// decorator의 파라미터가 data로 들어온다.
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;
	return data ? user?.[data] : user;
});
