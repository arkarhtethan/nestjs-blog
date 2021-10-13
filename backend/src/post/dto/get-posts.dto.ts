import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";

export class GetPostsOutput extends CoreOutput {
    posts?: Post[];
}