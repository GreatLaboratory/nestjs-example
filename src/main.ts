import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenExceptionFilter } from './filters/http-exception.filter';
import { loggerFunctionMiddleware } from './middlewares/logger-function.middleware';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.use(loggerFunctionMiddleware); // --> 전역으로 logger middleware 적용 (global-scoped)
	app.useGlobalFilters(new ForbiddenExceptionFilter()); // --> 전역에서 발생하는 ForbiddenException예외를 새롭게 만든 ForbiddenExceptionFilter로 처리 (global-scoped)
	app.useGlobalPipes(
		new ValidationPipe({
			// transform: true,
			whitelist: true, // request dto를 정의할 때 decorator가 없는 변수가 request json으로 들어오면 에러 발생
			forbidNonWhitelisted: true, // request json에 필요없는 변수가 들어오면 should not exist 에러 발생
		}),
	); // 전역에서 발생하는 라우트 핸들링에 대해서 위 설정으로 pipe 처리 --> (global-scoped)
	await app.listen(3000);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
