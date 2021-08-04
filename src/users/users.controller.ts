import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseFilters,
	ConflictException,
	ForbiddenException,
	Req,
	Res,
	HttpStatus,
	Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenExceptionFilter } from '../filters/http-exception.filter';
import { Response, Request } from 'express';

// @UseFilters(ForbiddenExceptionFilter) --> 이 컨트롤러에서 ForbiddenException 발생하면 전부 ForbiddenExceptionFilter로 예외처리
@Controller('users')
export class UsersController {
	// inject dependency by using constructor
	constructor(private readonly usersService: UsersService) {}

	// inject dependncy by using property
	// @Inject()
	// private readonly usersService: UsersService;

	@Post()
	@UseFilters(ForbiddenExceptionFilter)
	create(@Body() createUserDto: CreateUserDto) {
		throw new ForbiddenException(); // custom filter
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll() {
		throw new ConflictException(); // standard filter
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		console.log(req.params['id']);
		res.status(HttpStatus.OK);
		return [];
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
