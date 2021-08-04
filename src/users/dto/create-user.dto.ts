export class CreateUserDto {
	name: string;
	age: number;
	sex: boolean;
	address: Address;
}

class Address {
	country: string;
	city: string;
	street: string;
	zipcode?: string;
}
