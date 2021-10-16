import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, CreatePostOutput } from './dto/create-post.dto';
import { DeletePostDTO } from './dto/delete-post.dot';
import { GetPostByCategoryDto, GetPostByCategoryOutput } from './dto/get-post-by-category.dto';
import { GetPostByTagDto, GetPostByTagOutput } from './dto/get-post-by-tag.dto';
import { GetPostDTO, GetPostOutput } from './dto/get-post.dto';
import { GetPostsOutput } from './dto/get-posts.dto';
import { MyPostOutput } from './dto/my-post.dto';
import { UpdatePostDto, UpdatePostOutput } from './dto/update-post.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  private async getTagOrCreate (name: string) {
    let tagObject = await this.tagsRepository.findOne({ name })
    if (!tagObject) {
      tagObject = await this.tagsRepository.create({ name })
      await this.tagsRepository.save(tagObject)
    }
    return tagObject;
  }

  private async getCategoryOrCreate (name: string) {
    let categoryObjectToInsert = await this.categoryRepository.findOne({ name });
    if (!categoryObjectToInsert) {
      const createdCategory = await this.categoryRepository.create({ name });
      await this.categoryRepository.save(createdCategory);
      categoryObjectToInsert = createdCategory;
    }
    return categoryObjectToInsert;
  }

  async create (createPostDto: CreatePostDto, user: User): Promise<CreatePostOutput> {
    try {

      const { tags, category } = createPostDto;

      // -------------- start category ------------------
      // find cateogry, if not exists create one
      let categoryObjectToInsert: Category = await this.getCategoryOrCreate(category);

      // -------------- done category ------------------

      // -------------- start tag ------------------
      let tagsToInsert: Tag[] = [];
      for (let tag of tags) {
        let tagObject = await this.getTagOrCreate(tag);
        let savedTag = await this.tagsRepository.save(tagObject)
        tagsToInsert.push(savedTag);
      }
      // -------------- done tag ------------------

      const post = await this.postsRepository.create({ ...createPostDto, user, tags: tagsToInsert, category: categoryObjectToInsert });
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
      const post = await this.postsRepository.findOne({ id: getPostDto.id }, { relations: ['tags'] });
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

  async postByCategory (
    { slug }: GetPostByCategoryDto
  ): Promise<GetPostByCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne({ slug }, { relations: ['posts'] })
      if (!category) {
        return {
          ok: false,
          error: "Category not found."
        }
      }
      return {
        ok: true,
        posts: category.posts
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Can't get post by given category."
      }
    }
  }

  async postByTag (
    { slug }: GetPostByTagDto
  ): Promise<GetPostByTagOutput> {
    try {
      const tag = await this.tagsRepository.findOne({ slug }, { relations: ['posts'] })
      if (!tag) {
        return {
          ok: false,
          error: "Tag not found."
        }
      }
      return {
        ok: true,
        posts: tag.posts
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "Can't get post by given tag."
      }
    }
  }

  async update (
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<UpdatePostOutput> {
    try {
      let post = await this.postsRepository.findOne({ id, user }, { relations: ['category', 'tags'] });
      if (!post) {
        return {
          ok: false,
          error: 'Post not found',
        };
      }
      const { tags: newTags, category: newCategory } = updatePostDto;
      const { tags: oldTags, category: oldCategory } = post;

      let newCategoryToInsert: Category;
      let newTagsToInsert: Tag[] = [];

      delete updatePostDto.category
      delete updatePostDto.tags;

      if (newCategory) {
        if (oldCategory.name !== newCategory) {
          newCategoryToInsert = await this.getCategoryOrCreate(newCategory);
        }
      }

      if (newTags && newTags.length > 0) {
        //1. extract new added tag
        const transformedOldTags = oldTags.map(tag => tag.name);
        const newlyAddedTags = newTags.filter(tag => !transformedOldTags.includes(tag))
        newTagsToInsert = [...oldTags]
        //2. create tag if not exists
        for (let newTag of newlyAddedTags) {
          const tagObject: Tag = await this.getTagOrCreate(newTag);
          newTagsToInsert.push(tagObject);
        }
      }

      if (newTagsToInsert.length > 0) {
        post.tags = newTagsToInsert;
      }

      if (newCategoryToInsert) {
        post.category = newCategoryToInsert;
      }

      await this.postsRepository.save(post);
      post = await this.postsRepository.findOne({ id });
      return { ok: true, post };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot update post.',
      };
    }
  }

  async myPost (user: User): Promise<MyPostOutput> {
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
