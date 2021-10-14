import { InternalServerErrorException } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm"
import * as bcrypt from 'bcryptjs';

export enum UserRole {
    Client = 'Client',
    Owner = 'Owner',
    Delivery = 'Delivery',
}

@Entity()
export class User extends CoreEntity {

    @Column({ unique: true, nullable: false })
    @IsString()
    @Type(() => String)
    username: string;

    @Column({ nullable: false })
    @IsString()
    @Type(() => String)
    name: string;

    @Column({ select: false })
    @IsString()
    @MinLength(6)
    @Type(() => String)
    password: string;

    @Column({ unique: true })
    @IsEmail()
    @Type(() => String)
    email: string;

    @Column({ nullable: true })
    @Type(() => String)
    phonenumber?: string;

    @Column({ type: 'enum', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @BeforeInsert()
    async createUsername () {
        this.username = `${this.name.toLocaleLowerCase().replace(/ /g, '')}${Date.now()}`
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword (): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (e) {
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword (aPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(aPassword, this.password);
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}
