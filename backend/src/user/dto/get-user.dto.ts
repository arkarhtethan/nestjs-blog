import { PickType } from "@nestjs/mapped-types";
import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";

export class GetUserDto extends PickType(User, ['id']) { }

export class GetUserOutput extends CoreOutput {
    user?: User;
}