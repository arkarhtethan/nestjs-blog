import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationOutput {

    @ApiProperty()
    pages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty()
    count: number;
}

export class PaginationInput {
    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    pageNumber?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit?: number;
}
