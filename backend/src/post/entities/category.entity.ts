import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Category extends CoreEntity {

    @Column({ nullable: false, unique: true })
    @IsString()
    @Type(() => String)
    name: string;

    @Column({ nullable: false, unique: true })
    @IsString()
    @Type(() => String)
    slug: string;

    @OneToMany(() => Post, posts => posts.category)
    posts: Post[];

    @BeforeInsert()
    createSlug () {
        this.slug = this.name.trim().toLowerCase().replace(/ /g, '-')
    }
}