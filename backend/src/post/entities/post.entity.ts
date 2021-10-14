/* eslint-disable prettier/prettier */
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Post extends CoreEntity {

    @Column()
    @IsString()
    @Type(() => String)
    title: string;

    @Column()
    slug: string;

    @Column('text')
    @IsString()
    @Type(() => String)
    description: string;

    @Column()
    @IsString()
    @Type(() => String)
    coverImage: string;

    @BeforeInsert()
    generateSlug () {
        this.slug = `${this.title.toLocaleLowerCase().replace(/ /g, '-')}-${Date.now()}`
    }
}
