import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.output';

export class DeletePostParamDTO {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id: number;
}

export class DeletePostOutput extends CoreOutput {

}