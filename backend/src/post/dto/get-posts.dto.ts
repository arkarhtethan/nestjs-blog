import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { PaginationOutput } from "src/common/dtos/pagination.output";
import { Post } from "../entities/post.entity";

export class GetPostsInput {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    pageNumber?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit?: number;
}


class GetPostsData extends PaginationOutput {
    posts: Post[];
}

export class GetPostsOutput extends CoreOutput {
    data?: GetPostsData;
}
