import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { DeleteUserOutput } from './dto/delete-user.dto';
import { GetUserDto, GetUserOutput } from './dto/get-user.dto';
import { GetUsersOutput } from './dto/get-users.dto';
import { LoginDto, LoginOutput } from './dto/login.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register (createUserDto: CreateUserDto): Promise<CreateUserOutput> {
    try {
      const user = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      return {
        ok: true,
      }
    } catch (error) {
      if (error.errno && error.errno === 1062) {
        return {
          ok: false,
          error: `User with this email already exists.`
        }
      }
      return {
        ok: false,
        error: "Cannot create user."
      }
    }
  }

  async login ({ email, password }: LoginDto): Promise<LoginOutput> {
    try {
      const user = await this.usersRepository.findOne({ email }, { select: ['email', 'password'] });
      if (!user) {
        return {
          ok: false,
          error: "Invalid email / password"
        }
      }
      if (!await user.checkPassword(password)) {
        return {
          ok: false,
          error: "Invalid email / password."
        }
      }
      // generate token
      const loggedInUser = await this.usersRepository.findOne({ email });
      const token = await this.jwtService.sign(loggedInUser.id);
      return {
        ok: true,
        user: loggedInUser,
        token,
      }
    } catch (error) {
      return {
        ok: false,
        error: "Login Failed."
      }
    }
  }

  async findAll (): Promise<GetUsersOutput> {
    try {
      const users = await this.usersRepository.find();
      return {
        ok: true,
        users
      }
    } catch (error) {
      return {
        ok: false,
        error: "Cannot get all users."
      }
    }
  }

  async findOne ({ id }: GetUserDto): Promise<GetUserOutput> {
    try {
      const user = await this.usersRepository.findOne({ id });
      return {
        ok: true,
        user
      }
    } catch (error) {
      return {
        ok: false,
        error: "Cannot get user."
      }
    }
  }

  async update (updateUserDto: UpdateUserDto, authUser: User): Promise<UpdateUserOutput> {
    try {
      const { id } = authUser;
      let user = await this.usersRepository.findOne({ id });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        }
      }
      await this.usersRepository.update(id, updateUserDto);
      user = await this.usersRepository.findOne({ id });
      return {
        ok: true,
        user
      }
    } catch (error) {
      return {
        ok: false,
        error: "Cannot update users."
      }
    }
  }

  async deleteAccount (authUser: User): Promise<DeleteUserOutput> {
    try {
      const { id } = authUser;
      const user = await this.usersRepository.findOne({ id });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        }
      }
      await this.usersRepository.delete({ id });
      return {
        ok: true,
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Cannot delete users."
      }
    }
  }
}
