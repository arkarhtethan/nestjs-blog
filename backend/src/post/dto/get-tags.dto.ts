import { ApiPropertyOptional } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dtos/core.output";
import { Tag } from "../entities/tag.entity";

export class GetTagsOutput extends CoreOutput {
    @ApiPropertyOptional()
    tags?: Tag[];
}