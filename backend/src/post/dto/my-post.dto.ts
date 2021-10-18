import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class MyPostOutput extends CoreOutput {
    @ApiPropertyOptional({ type: [Post] })
    posts?: Post[];
}