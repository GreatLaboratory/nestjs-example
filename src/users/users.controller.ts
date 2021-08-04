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
	ParseIntPipe,
	ValidationPipe,
	DefaultValuePipe,
	Query,
	UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenExceptionFilter } from '../filters/http-exception.filter';
import { Response, Request } from 'express';

// @UseFilters(ForbiddenExceptionFilter) --> 이 컨트롤러에서 ForbiddenException 발생하면 전부 ForbiddenExceptionFilter로 예외처리 (controller-scoped)
@Controller('users')
export class UsersController {
	// inject dependency by using constructor
	constructor(private readonly usersService: UsersService) {}

	// inject dependncy by using property
	// @Inject()
	// private readonly usersService: UsersService;

	@Post()
	// @UseFilters(ForbiddenExceptionFilter) --> 특정 라우트 핸들러에만 필터를 적용시킬 수 있다. (method-scoped)
	// @UsePipes(new ValidationPipe()) --> 특정 라우트 핸들러에만 필터를 적용시킬 수 있다. (method-scoped)
	// create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) { --> 특정 파라미터에만 파이프를 적용시킬 수 있다. (parameter-scoped)
	create(@Body() createUserDto: CreateUserDto) {
		// throw new ForbiddenException(); // custom filter
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
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		// id에 "qewr"을 넣어서 요청하면 parameter level에서 exception이 발생하므로
		return this.usersService.update(id, updateUserDto); // 해당 method는 call되지 않는다.
	}

	@Delete(':id')
	remove(
		@Param('id', ParseIntPipe) id: number,
		@Query('page', new DefaultValuePipe(1234), ParseIntPipe) page: number,
	) {
		// page로 값을 넘기지 않아도 page변수엔 1234가 디폴트값으로 들어온다.
		console.log('page :', page); // page :  1234

		return this.usersService.remove(id);
	}
}
