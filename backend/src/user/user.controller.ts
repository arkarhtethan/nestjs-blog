import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  register (@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login (@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get()
  @Role(['Admin'])
  findAll () {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne (@Param() getUserDto: GetUserDto) {
    return this.userService.findOne(getUserDto);
  }

  @Patch()
  @Role(['User'])
  update (
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: User
  ) {
    return this.userService.update(updateUserDto, user);
  }

  @Delete(':id')
  @Role(['User'])
  remove (@Param('id') id: string,
    @AuthUser() user: User) {
    return this.userService.remove(user);
  }
}
