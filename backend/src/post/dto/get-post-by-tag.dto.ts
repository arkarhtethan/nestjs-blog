import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.output";
import { Post } from "../entities/post.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetPostByTagParamDto {
    @ApiProperty()
    @IsString()
    @Type(() => String)
    slug: string;
}

export class GetPostByTagQueryInput extends PaginationInput { }

export class GetPostByTag extends PaginationOutput {
    @ApiProperty({ type: [Post] })
    posts: Post[];
}

export class GetPostByTagOutput extends CoreOutput {
    @ApiPropertyOptional()
    data?: GetPostByTag;
}