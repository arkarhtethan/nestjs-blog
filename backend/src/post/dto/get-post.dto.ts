import { Type } from "class-transformer";
import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";

export class GetPostDTO {
    @Type(() => Number)
    id: number;
}

export class GetPostOutput extends CoreOutput {
    post?: Post;
}