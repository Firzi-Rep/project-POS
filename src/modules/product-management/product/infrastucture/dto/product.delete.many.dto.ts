import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class ProductDeleteManyDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  ids: string[];
}
