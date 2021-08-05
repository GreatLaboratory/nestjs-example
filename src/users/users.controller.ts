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
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenExceptionFilter } from '../config/filters/http-exception.filter';
import { Response, Request } from 'express';
import { RoleGuard } from 'src/config/guards/roles.guard';
import { AuthGuard } from 'src/config/guards/auth.guard';
import { Roles } from 'src/config/decorators/roles.decorator';

@UseGuards(AuthGuard, RoleGuard) // --> 이 컨트롤러에 들어오는 request에 대해서 인증 및 role 인가 처리 (controller-scoped)
// @UseFilters(ForbiddenExceptionFilter) --> 이 컨트롤러에서 ForbiddenException 발생하면 전부 ForbiddenExceptionFilter로 예외처리 (controller-scoped)
@Controller('users')
export class UsersController {
	// inject dependency by using constructor
	constructor(private readonly usersService: UsersService) {}

	// inject dependncy by using property
	// @Inject()
	// private readonly usersService: UsersService;

	@Post()
	@Roles('admin') // 로그인한 user객체에 roles: ['admin']이 있는 user만 해당 핸들러에 접근 가능
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
	@Roles('admin')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		// id에 "qewr"을 넣어서 요청하면 parameter level에서 exception이 발생하므로
		return this.usersService.update(id, updateUserDto); // 해당 method는 call되지 않는다.
	}

	@Delete(':id')
	@Roles('admin')
	remove(
		@Param('id', ParseIntPipe) id: number,
		@Query('page', new DefaultValuePipe(1234), ParseIntPipe) page: number,
	) {
		// page로 값을 넘기지 않아도 page변수엔 1234가 디폴트값으로 들어온다.
		console.log('page :', page); // page :  1234

		return this.usersService.remove(id);
	}
}
