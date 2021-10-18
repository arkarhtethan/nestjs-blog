import { IsString, MinLength } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ name: "Old Password", description: "Provide your current password" })
    @IsString()
    @MinLength(6)
    oldPassword: string;

    @ApiProperty({ name: "New Password", description: "Provide your new password you want to change" })
    @ApiProperty()
    @IsString()
    @MinLength(6)
    newPassword: string;

}

export class changePasswordOutput extends CoreOutput { }