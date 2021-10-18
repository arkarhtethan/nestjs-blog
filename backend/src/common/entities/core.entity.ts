import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CoreEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Type(type => Number)
    id: number;

    @ApiProperty({ type: Date })
    @CreateDateColumn()
    @Type(type => Date)
    createdAt: Date;

    @ApiProperty({ type: Date })
    @UpdateDateColumn()
    @Type(type => Date)
    updatedAt: Date;

}