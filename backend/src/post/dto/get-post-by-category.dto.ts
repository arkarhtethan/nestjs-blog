import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.output";
import { Post } from "../entities/post.entity";

export class GetPostByCategoryParamDto {
    @IsString()
    @Type(() => String)
    slug: string;
}

export class GetPostByCateogryQueryDto extends PaginationInput { }

class GetPostsData extends PaginationOutput {
    posts: Post[];
}
export class GetPostByCategoryOutput extends CoreOutput {
    data?: GetPostsData;
}