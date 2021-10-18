import { OmitType, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/core.output';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) { }

export class UpdateUserOutput extends CoreOutput {
    @ApiPropertyOptional({ type: User })
    user?: User;
}