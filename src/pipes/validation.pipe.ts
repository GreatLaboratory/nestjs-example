import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// 해당 클래스는 이미 built-in 되어있는 클래스를 직접 구현해본 것이다.
// 이 클래스는 내장된 ValidationPipe 클래스와 같은 동작을 한다.
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException('Validation failed');
		}
		return value;
	}

	private toValidate(metatype): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
