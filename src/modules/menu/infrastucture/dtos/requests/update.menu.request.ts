import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateMenuRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  constructor(public readonly id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}