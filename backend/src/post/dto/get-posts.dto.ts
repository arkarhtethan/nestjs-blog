import { CoreOutput } from "src/common/dtos/core.output";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.output";
import { Post } from "../entities/post.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class GetPostsQueryInput extends PaginationInput {
}

class GetPostsData extends PaginationOutput {
    @ApiProperty({ type: [Post] })
    posts: Post[];
}

export class GetPostsOutput extends CoreOutput {
    @ApiPropertyOptional()
    data?: GetPostsData;
}
