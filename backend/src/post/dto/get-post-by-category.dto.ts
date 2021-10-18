import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.output";
import { Post } from "../entities/post.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class GetPostByCategoryParamDto {
    @ApiProperty()
    @IsString()
    @Type(() => String)
    slug: string;
}

export class GetPostByCateogryQueryDto extends PaginationInput { }

class GetPostsData extends PaginationOutput {
    @ApiProperty()
    posts: Post[];
}
export class GetPostByCategoryOutput extends CoreOutput {
    @ApiPropertyOptional()
    data?: GetPostsData;
}