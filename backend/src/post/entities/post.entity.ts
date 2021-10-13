import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Post extends CoreEntity {

    @Column()
    @IsString()
    @Type(() => String)
    title: string;

    @Column()
    @IsString()
    @Type(() => String)
    slug: string;

    @Column()
    @IsString()
    @Type(() => String)
    description: string;

    @Column()
    @IsString()
    @Type(() => String)
    coverImage: string;
}
