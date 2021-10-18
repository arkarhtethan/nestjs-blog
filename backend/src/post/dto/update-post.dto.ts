import { PartialType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dtos/core.output';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './create-post.dto';
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdatePostDto extends PartialType(CreatePostDto) { }

export class UpdatePostOutput extends CoreOutput {
    @ApiPropertyOptional({ type: Post })
    post?: Post;
}
