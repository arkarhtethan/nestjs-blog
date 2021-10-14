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
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @Role(['User'])
  create (@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
    return this.postService.create(createPostDto, user);
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
  @Role(['User'])
  update (
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @AuthUser() user: User
  ) {
    return this.postService.update(+id, updatePostDto, user);
  }

  @Delete(':id')
  @Role(['User'])
  remove (@Param() deletePostDTO: DeletePostDTO, @AuthUser() user: User) {
    return this.postService.remove(deletePostDTO, user);
  }
}
