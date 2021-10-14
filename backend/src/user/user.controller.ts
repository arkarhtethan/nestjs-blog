import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  register (@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
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


  @Get('profile')
  @Role(['User', 'Admin'])
  myProfile (@AuthUser() user: User) {
    return this.userService.myProfile(user);
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

  @Patch('change-password')
  @Role(['User'])
  changePassword (
    @Body() changePasswordDto: ChangePasswordDto,
    @AuthUser() user: User
  ) {
    console.log(changePasswordDto)
    return this.userService.changePassword(changePasswordDto, user);
  }

  @Delete()
  @Role(['User'])
  deleteAccount (@AuthUser() user: User) {
    return this.userService.deleteAccount(user);
  }
}
