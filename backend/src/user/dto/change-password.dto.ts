import { IsString, MinLength } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";

export class ChangePasswordDto {
    @IsString()
    @MinLength(6)
    oldPassword: string;
    @IsString()
    @MinLength(6)
    newPassword: string;

}

export class changePasswordOutput extends CoreOutput { }