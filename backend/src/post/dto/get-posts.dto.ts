import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.output";
import { Post } from "../entities/post.entity";

export class GetPostsQueryInput extends PaginationInput {
}

class GetPostsData extends PaginationOutput {
    posts: Post[];
}

export class GetPostsOutput extends CoreOutput {
    data?: GetPostsData;
}
