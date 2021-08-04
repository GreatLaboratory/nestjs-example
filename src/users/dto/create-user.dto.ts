import { Type } from 'class-transformer';
import { IsString, IsInt, IsBoolean, IsObject, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';

class AddressDto {
	@IsString()
	country: string;

	@IsString()
	city: string;

	@IsString()
	street: string;

	@IsString()
	zipcode?: string;
}

export class CreateUserDto {
	@IsString()
	name: string;

	@IsInt()
	age: number;

	@IsBoolean()
	sex: boolean;

	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => AddressDto)
	address: AddressDto;
}
