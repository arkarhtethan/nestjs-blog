import { ApiPropertyOptional } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dtos/core.output";
import { Category } from "../entities/category.entity";

export class GetCategoriesOutput extends CoreOutput {
    @ApiPropertyOptional()
    categories?: Category[];
}