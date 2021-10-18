import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity, ManyToMany } from "typeorm";
import { Post } from "./post.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Tag extends CoreEntity {

    @ApiProperty()
    @Column({ nullable: false, unique: true })
    @IsString()
    @Type(() => String)
    name: string;

    @ApiProperty()
    @Column({ nullable: false, unique: true })
    @IsString()
    @Type(() => String)
    slug: string;

    @ManyToMany(() => Post, posts => posts.tags)
    posts: Post[];

    @BeforeInsert()
    createSlug () {
        this.slug = this.name.trim().toLowerCase().replace(/ /g, '-')
    }
}