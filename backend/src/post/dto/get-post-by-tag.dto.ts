import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";

export class GetPostByTagDto {
    @IsString()
    @Type(() => String)
    slug: string;
}

export class GetPostByTagOutput extends CoreOutput {
    posts?: Post[];
}