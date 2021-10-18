import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { InternalServerErrorException } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm"
import * as bcrypt from 'bcryptjs';
import { Post } from "src/post/entities/post.entity";

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
}

@Entity()
export class User extends CoreEntity {

    @Column({ unique: true, nullable: false })
    @IsString()
    @Type(() => String)
    username: string;

    @ApiProperty({ name: "User Name", description: "Provide Your name", example: "John Doe" })
    @Column({ nullable: false })
    @IsString()
    @Type(() => String)
    name: string;

    @ApiProperty({ name: "Password", minLength: 6, description: "Password for your account.", example: "******" })
    @Column({ select: false })
    @IsString()
    @MinLength(6)
    @Type(() => String)
    password: string;

    @ApiProperty({ name: "Email", description: "Your email address.", example: "exmaple@domain.com" })
    @Column({ unique: true })
    @IsEmail()
    @Type(() => String)
    email: string;

    @ApiPropertyOptional({ name: "Phone Number", description: "Your current phone number." })
    @Column({ nullable: true })
    @Type(() => String)
    phonenumber?: string;

    @ApiProperty({ enum: UserRole, name: "User Role", description: "Provide your role." })
    @Column({ type: 'enum', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @OneToMany(() => Post, posts => posts.user)
    posts: Post[];

    @BeforeInsert()
    async createUsername () {
        if (this.name) {
            this.username = `${this.name.toLocaleLowerCase().replace(/ /g, '')}${Date.now()}`
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword (): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (e) {
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword (aPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(aPassword, this.password);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
