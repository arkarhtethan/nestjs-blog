import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class MyProfileOutput extends CoreOutput {
    @ApiPropertyOptional({ type: User })
    user?: User;
}