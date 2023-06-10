import { Inject } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MenuRepository } from "src/modules/menu/application/ports/menu.repository";

export class GetMenuQueryRequest {
  
  constructor(public readonly id: string) {}
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
  }