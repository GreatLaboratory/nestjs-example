import { IsArray, IsEmail, IsInt, IsString } from 'class-validator';

export class UserEntity {
	@IsInt()
	id: number;

	@IsString()
	name: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsArray()
	@IsString({ each: true })
	roles: string[];
}
