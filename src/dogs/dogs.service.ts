import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
	printDogs(id: number) {
		console.log(`#${id}-dog : wall wall!!!@!!`);
	}
}
