import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetPostParamDTO {
    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    id: number;
}

export class GetPostOutput extends CoreOutput {
    @ApiPropertyOptional()
    post?: Post;
}