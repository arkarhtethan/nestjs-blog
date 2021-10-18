import { PickType, ApiPropertyOptional } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";

export class LoginDto extends PickType(User, ['email', 'password']) { }

export class LoginOutput extends CoreOutput {
    @ApiPropertyOptional()
    token?: string;
    @ApiPropertyOptional({ type: User })
    user?: User;
}