import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DogsModule } from 'src/dogs/dogs.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [DogsModule],
	// imports: [DogsService], --> 에러 난다.
	/*
		ERROR [ExceptionHandler] Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument DogsService at index [0] is available in the UsersModule context.
		Potential solutions:
		- If DogsService is a provider, is it part of the current UsersModule?
		- If DogsService is exported from a separate @Module, is that module imported within UsersModule?
		@Module({
			imports: [ the Module containing DogsService ]
		})
	*/
})
export class UsersModule {}
