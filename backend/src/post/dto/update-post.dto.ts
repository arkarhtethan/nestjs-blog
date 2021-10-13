import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.output';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) { }

export class UpdatePostOutput extends CoreOutput {
    post?: Post;
}
