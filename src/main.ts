import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenExceptionFilter } from './filters/http-exception.filter';
import { loggerFunctionMiddleware } from './utils/logger-function.middleware';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.use(loggerFunctionMiddleware); --> 전역으로 logger middleware 적용
	// app.useGlobalFilters(new ForbiddenExceptionFilter()); --> 전역에서 발생하는 ForbiddenException예외를 새롭게 만든 ForbiddenExceptionFilter로 처리
	await app.listen(3000);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
