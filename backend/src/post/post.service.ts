import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE_NUMBER, DEFAULT_POSTS_PER_PAGE } from 'src/common/constants';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, CreatePostOutput } from './dto/create-post.dto';
import { DeletePostDTO } from './dto/delete-post.dot';
import { GetPostByCategoryParamDto, GetPostByCategoryOutput, GetPostByCateogryQueryDto } from './dto/get-post-by-category.dto';
import { GetPostByTagParamDto, GetPostByTagOutput, GetPostByTagQueryInput } from './dto/get-post-by-tag.dto';
import { GetPostDTO, GetPostOutput } from './dto/get-post.dto';
import { GetPostsQueryInput, GetPostsOutput } from './dto/get-posts.dto';
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

  async findAll (getPostsInput: GetPostsQueryInput): Promise<GetPostsOutput> {
    try {
      // default page number is one if it's not provided
      const { pageNumber = DEFAULT_PAGE_NUMBER, limit = DEFAULT_POSTS_PER_PAGE } = getPostsInput;

      const totalPosts = await this.postsRepository.count();

      const posts = await this.postsRepository.find({
        take: limit,
        skip: (pageNumber * limit - limit),
      });

      const totalPages = Math.ceil(totalPosts / limit);

      return {
        data: {
          posts,
          pages: totalPages,
          count: limit,
          currentPage: pageNumber,
        },
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
    { slug }: GetPostByCategoryParamDto,
    getPostByCateogryQueryDto: GetPostByCateogryQueryDto,
  ): Promise<GetPostByCategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne({ slug })
      if (!category) {
        return {
          ok: false,
          error: "Category not found."
        }
      }

      const { pageNumber = DEFAULT_PAGE_NUMBER, limit = DEFAULT_POSTS_PER_PAGE } = getPostByCateogryQueryDto;

      const totalPosts = await this.postsRepository.count({
        where: {
          category,
        },
      });

      const posts = await this.postsRepository.find({
        where: {
          category,
        },
        take: limit,
        skip: (pageNumber * limit - limit),
      })

      const totalPages = Math.ceil(totalPosts / limit);

      return {
        ok: true,
        data: {
          posts,
          count: limit,
          currentPage: pageNumber,
          pages: totalPages,
        }
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
    { slug }: GetPostByTagParamDto,
    { pageNumber = DEFAULT_PAGE_NUMBER, limit = DEFAULT_POSTS_PER_PAGE }:
      GetPostByTagQueryInput,
  ): Promise<GetPostByTagOutput> {
    try {

      const tag = await this.tagsRepository.findOne({ slug }, { select: ['id'] })

      if (!tag) {
        return {
          ok: false,
          error: "Tag not found."
        }
      }

      const postsQuery = await this.postsRepository.createQueryBuilder('post')
        .innerJoin('post.tags', 'postTags')
        .where(`postTags.id=${tag.id}`);

      const totalPosts = await postsQuery.getCount();

      const posts = await postsQuery.take(limit)
        .skip(pageNumber * limit - limit)
        .getMany();

      const totalPages = Math.ceil(totalPosts / limit);

      return {
        ok: true,
        data: {
          posts,
          count: limit,
          currentPage: pageNumber,
          pages: totalPages,
        }
      }
    } catch (error) {
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
