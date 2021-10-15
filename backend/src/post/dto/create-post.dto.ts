import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.output';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends PickType(Post, [
    'title',
    'description',
    'coverImage',
]) {
    @IsString()
    @Type(() => String)
    category: string;

    @IsArray()
    @Type(() => String)
    tags: string[];
}

export class CreatePostOutput extends CoreOutput {
    post?: Post;
}
