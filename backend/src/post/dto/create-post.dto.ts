import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.output';
import { Post } from '../entities/post.entity';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto extends PickType(Post, [
    'title',
    'description',
    'coverImage',
]) {

    @ApiProperty({ name: 'category', description: "Provide category for post.", type: String, example: "Programming" })
    @IsString()
    @Type(() => String)
    category: string;

    @ApiProperty({ name: 'tags', description: "Provide list of tags for post.", type: String, isArray: true, example: ['html', 'css'] })
    @IsArray()
    @Type(() => String)
    tags: string[];
}

export class CreatePostOutput extends CoreOutput {
    @ApiPropertyOptional()
    post?: Post;
}
