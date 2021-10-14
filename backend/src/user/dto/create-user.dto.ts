import { PickType } from "@nestjs/mapped-types";
import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";

export class CreateUserDto extends PickType(User, [
    'name',
    'password',
    'email',
    'phonenumber',
]) { }

export class CreateUserOutput extends CoreOutput {
    user?: User;
    token?: string;
}