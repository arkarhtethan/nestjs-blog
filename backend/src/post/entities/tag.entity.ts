import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class Tag extends CoreEntity {

    @Column({ nullable: false, unique: true })
    @IsString()
    @Type(() => String)
    name: string;

    @Column({ nullable: false, unique: true })
    @IsString()
    @Type(() => String)
    slug: string;

    @BeforeInsert()
    createSlug () {
        this.slug = this.name.trim().toLowerCase().replace(/ /g, '-')
    }
}