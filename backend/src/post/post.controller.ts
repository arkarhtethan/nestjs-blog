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
import { ApiTags, ApiOkResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { PostService } from './post.service';
import { CreatePostDto, CreatePostOutput } from './dto/create-post.dto';
import { UpdatePostDto, UpdatePostOutput } from './dto/update-post.dto';
import { GetPostOutput, GetPostParamDTO } from './dto/get-post.dto';
import { DeletePostOutput, DeletePostParamDTO } from './dto/delete-post.dot';
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { MyPostOutput } from './dto/my-post.dto';
import { GetPostByCategoryParamDto, GetPostByCategoryOutput, GetPostByCateogryQueryDto } from './dto/get-post-by-category.dto';
import { GetPostByTagParamDto, GetPostByTagOutput, GetPostByTagQueryInput } from './dto/get-post-by-tag.dto';
import { GetPostsQueryInput, GetPostsOutput } from './dto/get-posts.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ApiOkResponse({
    description: 'Post created successfully',
    type: CreatePostOutput,

  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  @Role(['User'])
  create (@Body() createPostDto: CreatePostDto, @AuthUser() user: User): Promise<CreatePostOutput> {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all post successfully',
    type: GetPostsOutput,

  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async findAll (@Query() getPostsInput: GetPostsQueryInput): Promise<GetPostsOutput> {
    return await this.postService.findAll(getPostsInput);
  }

  @Get('mypost')
  @Role(['User'])
  @ApiOkResponse({
    description: 'Get all post for logged in user successfully',
    type: MyPostOutput,

  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  myPost (
    @AuthUser() user: User
  ): Promise<MyPostOutput> {
    return this.postService.myPost(user);
  }

  @Get('category/:slug')
  @ApiOkResponse({
    description: 'Get all post for given category successfully',
    type: GetPostByCategoryOutput,

  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  postByCategory (
    @Param() postByCategoryDto: GetPostByCategoryParamDto,
    @Query() getPostByCateogryQueryDto: GetPostByCateogryQueryDto,
  ): Promise<GetPostByCategoryOutput> {
    return this.postService.postByCategory(postByCategoryDto, getPostByCateogryQueryDto);
  }

  @Get('tag/:slug')
  @ApiOkResponse({
    description: 'Get all post for given tag successfully',
    type: GetPostByTagOutput,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  postByTag (
    @Param() postByTagDto: GetPostByTagParamDto,
    @Query() getPostByTagQueryInput: GetPostByTagQueryInput
  ): Promise<GetPostByTagOutput> {
    return this.postService.postByTag(postByTagDto, getPostByTagQueryInput);
  }

  @ApiOkResponse({
    description: 'Get single post for given id successfully',
    type: GetPostOutput,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findOne (@Param() getPostParamDTO: GetPostParamDTO): Promise<GetPostOutput> {
    return this.postService.findOne(getPostParamDTO);
  }

  @ApiOkResponse({
    description: 'Updated post successfully',
    type: UpdatePostOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch(':id')
  @Role(['User'])
  update (
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @AuthUser() user: User
  ): Promise<UpdatePostOutput> {
    return this.postService.update(+id, updatePostDto, user);
  }


  @ApiOkResponse({
    description: 'Deleted post successfully',
    type: DeletePostOutput,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':id')
  @Role(['User'])
  remove (@Param() deletePostDTO: DeletePostParamDTO, @AuthUser() user: User): Promise<DeletePostOutput> {
    return this.postService.remove(deletePostDTO, user);
  }
}
