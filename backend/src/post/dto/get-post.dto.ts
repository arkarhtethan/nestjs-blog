import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";

export class GetPostDTO {
    @Type(() => Number)
    @IsNumber()
    id: number;
}

export class GetPostOutput extends CoreOutput {
    post?: Post;
}