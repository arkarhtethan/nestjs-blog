import { PickType } from "@nestjs/mapped-types";
import { CoreOutput } from "src/common/dtos/core.output";
import { Post } from "../entities/post.entity";

export class CreatePostDto extends PickType(Post, [
    'title',
    'slug',
    'description',
    'coverImage',
]) { }

export class CreatePostOutput extends CoreOutput {
    post?: Post;
}