import { Inject, Injectable } from '@nestjs/common';
import { DogsService } from 'src/dogs/dogs.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable() // be managed by the Nest IoC container.
export class UsersService {
	// inject dependency by using constructor
	constructor(private readonly dogsService: DogsService) {}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: number) {
		return `This action returns a #${id} users`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		this.dogsService.printDogs(id);
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
