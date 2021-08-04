import { Global, Module } from '@nestjs/common';
import { DogsService } from './dogs.service';

// @Global() -> user module에서 dogs module을 import 안해도 이 어노테이션으로 사용 가능
@Module({
	providers: [DogsService],
	exports: [DogsService],
})
export class DogsModule {}
