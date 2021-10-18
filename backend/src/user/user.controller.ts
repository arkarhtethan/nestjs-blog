import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';
import { GetUserDto, GetUserOutput } from './dto/get-user.dto';
import { LoginDto, LoginOutput } from './dto/login.dto';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from './entities/user.entity';
import { ChangePasswordDto, changePasswordOutput } from './dto/change-password.dto';
import { ApiTags } from "@nestjs/swagger";
import { ApiOkResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { GetUsersOutput } from './dto/get-users.dto';
import { DeleteUserOutput } from './dto/delete-user.dto';
import { MyProfileOutput } from './dto/my-profile.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @ApiOkResponse({
    description: 'Account created successfully',
    type: CreateUserOutput,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  register (@Body() createUserDto: CreateUserDto): Promise<CreateUserOutput> {
    return this.userService.register(createUserDto);
  }


  @ApiOkResponse({
    description: 'Login successfully',
    type: LoginOutput,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('login')
  login (@Body() loginDto: LoginDto): Promise<LoginOutput> {
    return this.userService.login(loginDto);
  }


  @ApiOkResponse({
    description: 'Updated post successfully',
    type: GetUsersOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  @Role(['Admin'])
  findAll (): Promise<GetUsersOutput> {
    return this.userService.findAll();
  }


  @ApiOkResponse({
    description: 'Get my profile successfully',
    type: MyProfileOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('profile')
  @Role(['User', 'Admin'])
  myProfile (@AuthUser() user: User): Promise<MyProfileOutput> {
    return this.userService.myProfile(user);
  }


  @ApiOkResponse({
    description: 'Get single user successfully',
    type: GetUserOutput,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findOne (@Param() getUserDto: GetUserDto): Promise<GetUserOutput> {
    return this.userService.findOne(getUserDto);
  }


  @ApiOkResponse({
    description: 'Updated post successfully',
    type: UpdateUserOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch()
  @Role(['User'])
  update (
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: User
  ): Promise<UpdateUserOutput> {
    return this.userService.update(updateUserDto, user);
  }


  @ApiOkResponse({
    description: 'Password changed successfully',
    type: changePasswordOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch('change-password')
  @Role(['User'])
  changePassword (
    @Body() changePasswordDto: ChangePasswordDto,
    @AuthUser() user: User
  ): Promise<changePasswordOutput> {
    console.log(changePasswordDto)
    return this.userService.changePassword(changePasswordDto, user);
  }


  @ApiOkResponse({
    description: 'Account Deleted successfully',
    type: DeleteUserOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete()
  @Role(['User'])
  deleteAccount (@AuthUser() user: User): Promise<DeleteUserOutput> {
    return this.userService.deleteAccount(user);
  }
}
