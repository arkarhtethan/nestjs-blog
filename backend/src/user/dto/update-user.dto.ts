import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.output';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserOutput extends CoreOutput {
    user?: User;
}