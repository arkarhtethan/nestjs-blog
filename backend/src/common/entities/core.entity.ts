import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Type } from 'class-transformer';

export class CoreEntity {

    @PrimaryGeneratedColumn()
    @Type(type => Number)
    id: number;

    @CreateDateColumn()
    @Type(type => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Type(type => Date)
    updatedAt: Date;

}