import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, CreatePostOutput } from './dto/create-post.dto';
import { DeletePostDTO } from './dto/delete-post.dot';
import { GetPostDTO, GetPostOutput } from './dto/get-post.dto';
import { GetPostsOutput } from './dto/get-posts.dto';
import { UpdatePostDto, UpdatePostOutput } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) { }

  async create (createPostDto: CreatePostDto, user: User): Promise<CreatePostOutput> {
    try {
      const post = await this.postsRepository.create({ ...createPostDto, user });
      await this.postsRepository.save(post);
      return {
        post,
        ok: true,
      };
    } catch (error) {
      Logger.error(error);
      return {
        ok: false,
        error: "Can't create post.",
      };
    }
  }

  async findAll (): Promise<GetPostsOutput> {
    try {
      const posts = await this.postsRepository.find();
      return {
        posts,
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't get all posts.",
      };
    }
  }

  async findOne (getPostDto: GetPostDTO): Promise<GetPostOutput> {
    try {
      const post = await this.postsRepository.findOne({ id: getPostDto.id });
      if (!post) {
        return {
          ok: false,
          error: 'Post not found.',
        };
      }
      return {
        post,
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't get post.",
      };
    }
  }

  async update (
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<UpdatePostOutput> {
    try {
      let post = await this.postsRepository.findOne({ id, user });
      if (!post) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      // check ownership
      await this.postsRepository.update(id, updatePostDto);
      post = await this.postsRepository.findOne({ id });
      return { ok: true, post };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot update post.',
      };
    }
  }

  async myPost (user: User) {
    try {
      const posts = await this.postsRepository.find({ user });
      if (!posts) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      return {
        ok: true,
        posts,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't get mypost.",
      };
    }
  }


  async remove ({ id }: DeletePostDTO, user: User): Promise<UpdatePostOutput> {
    try {
      const post = await this.postsRepository.findOne({ id, user });
      if (!post) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      await this.postsRepository.delete({ id });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't delete post.",
      };
    }
  }
}
