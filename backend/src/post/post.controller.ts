import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDTO } from './dto/get-post.dto';
import { DeletePostDTO } from './dto/delete-post.dot';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create (@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll () {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne (@Param() getPostDTO: GetPostDTO) {
    return this.postService.findOne(getPostDTO);
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove (@Param() deletePostDTO: DeletePostDTO) {
    return this.postService.remove(deletePostDTO);
  }
}
