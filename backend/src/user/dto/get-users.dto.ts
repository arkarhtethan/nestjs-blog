import { CoreOutput } from "src/common/dtos/core.output";
import { User } from "../entities/user.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersOutput extends CoreOutput {
    @ApiPropertyOptional({ type: [User] })
    users?: User[];
}