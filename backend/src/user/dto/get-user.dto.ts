import { PickType, ApiPropertyOptional } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";

export class GetUserDto extends PickType(User, ['id']) { }

export class GetUserOutput extends CoreOutput {
    @ApiPropertyOptional({ type: User })
    user?: User;
}