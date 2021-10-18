/* eslint-disable prettier/prettier */
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from "src/user/entities/user.entity";
import { Category } from "./category.entity";
import { Tag } from "./tag.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Post extends CoreEntity {

    @ApiProperty({ description: "Title of the post", example: "Learning NestJS" })
    @Column()
    @IsString()
    @Type(() => String)
    title: string;

    @Column()
    slug: string;

    @ApiProperty({ description: "Description of the post", example: "This is sample description." })
    @Column('text')
    @IsString()
    @Type(() => String)
    description: string;

    @ApiProperty({ description: "Please provide image url for cover image.", example: "https://www.example.com/somepic.png." })
    @Column()
    @IsString()
    @Type(() => String)
    coverImage: string;

    @ManyToOne(() => User, user => user.posts, { nullable: false, onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Category, category => category.posts, { onDelete: "SET NULL" })
    category: Category;

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable({
        name: "post_post_tag_id",
        joinColumn: {
            name: "post",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag",
            referencedColumnName: "id"
        }
    })
    tags: Tag[];

    @BeforeInsert()
    generateSlug () {
        this.slug = `${this.title.toLocaleLowerCase().replace(/ /g, '-')}-${Date.now()}`
    }
}
