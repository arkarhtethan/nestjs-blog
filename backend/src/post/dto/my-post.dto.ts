import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";

export class MyPostOutput extends CoreOutput {
    posts?: Post[];
}