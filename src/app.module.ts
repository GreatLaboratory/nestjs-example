import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DogsModule } from './dogs/dogs.module';
import { loggerClassMiddleware } from './utils/logger-class.middleware';
import { UsersController } from './users/users.controller';
import { loggerFunctionMiddleware } from './utils/logger-function.middleware';

@Module({
	imports: [UsersModule, DogsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// forRoutes로 특정 컨트롤러나 path만 적용시키지 않고 전역으로 적용시키려면 main.ts에서 설정해야한다.
		// consumer.apply(loggerClassMiddleware).forRoutes(UsersController);
		consumer.apply(loggerFunctionMiddleware).forRoutes(UsersController);
	}
}
