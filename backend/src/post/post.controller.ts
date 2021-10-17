import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDTO } from './dto/get-post.dto';
import { DeletePostDTO } from './dto/delete-post.dot';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { MyPostOutput } from './dto/my-post.dto';
import { GetPostByCategoryParamDto, GetPostByCategoryOutput, GetPostByCateogryQueryDto } from './dto/get-post-by-category.dto';
import { GetPostByTagParamDto, GetPostByTagOutput, GetPostByTagQueryInput } from './dto/get-post-by-tag.dto';
import { GetPostsQueryInput, GetPostsOutput } from './dto/get-posts.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @Role(['User'])
  create (@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  async findAll (@Query() getPostsInput: GetPostsQueryInput): Promise<GetPostsOutput> {
    return await this.postService.findAll(getPostsInput);
  }

  @Get('mypost')
  @Role(['User'])
  myPost (
    @AuthUser() user: User
  ): Promise<MyPostOutput> {
    return this.postService.myPost(user);
  }

  @Get('category/:slug')
  postByCategory (
    @Param() postByCategoryDto: GetPostByCategoryParamDto,
    @Query() getPostByCateogryQueryDto: GetPostByCateogryQueryDto,
  ): Promise<GetPostByCategoryOutput> {
    return this.postService.postByCategory(postByCategoryDto, getPostByCateogryQueryDto);
  }

  @Get('tag/:slug')
  postByTag (
    @Param() postByTagDto: GetPostByTagParamDto,
    @Query() getPostByTagQueryInput: GetPostByTagQueryInput
  ): Promise<GetPostByTagOutput> {
    return this.postService.postByTag(postByTagDto, getPostByTagQueryInput);
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
