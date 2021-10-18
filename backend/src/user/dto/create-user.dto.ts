import { PickType, ApiPropertyOptional } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";

export class CreateUserDto extends PickType(User, [
    'name',
    'password',
    'email',
    'phonenumber',
]) { }

export class CreateUserOutput extends CoreOutput {
    @ApiPropertyOptional({ type: User })
    user?: User;
    @ApiPropertyOptional()
    token?: string;
}