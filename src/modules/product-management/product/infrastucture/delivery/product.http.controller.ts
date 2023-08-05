import {
    Controller,
    UseGuards,
    Post,
    Res,
    Body,
    HttpStatus,
    Get,
    Query,
    Param,
    Patch,
  } from '@nestjs/common';
  import { CommandBus, QueryBus } from '@nestjs/cqrs';
  import { Builder } from 'builder-pattern';
  import { Response, response } from 'express';
import { ProductCreateCommand, ProductCreateCommandResult} from '../../application/command/product.create.command';
import { ProductCreateDto } from '../dto/product.create.dto';
import { ProductUpdateDto } from '../dto/product.update.dto';
import { ProductUpdateCommand, ProductUpdateCommandResult } from '../../application/command/product.update.command';
  
  @Controller('product-management/products')
  export class ProductController {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}

    @Post('create')
    async create(@Body() dto: ProductCreateDto) {
      try {
        // console.log("masuk ke controller create product dengan payload",dto)
           const command = Builder<ProductCreateCommand>(
               ProductCreateCommand,
           {
                ...dto,
           },
           ).build();

       const result = await this.commandBus.execute<
           ProductCreateCommand,
           ProductCreateCommandResult
       >(command);

      return {
        statusCode: 201,
        message: "success",
        data: result.product
      }

      } catch (e) {
        console.trace(e);
           throw e;
      }
   }
  
    // @Get()
    // async findMany(
    //   @Res() res: Response,
    //   @Query() dto: ProductFindManyQueryDto,
    // ) {
    //   const { page, limit } = dto;
  
    //   const responseBuilder = Builder<
    //     BaseHttpPaginatedResponseDto<ProductEntity[], any>
    //   >(BaseHttpPaginatedResponseDto);
    //   responseBuilder.statusCode(200);
    //   responseBuilder.message('Product List Fetched Successfully!');
  
    //   const builder = Builder<ProductFindManyQuery>(
    //     ProductFindManyQuery,
    //     {
    //       ...dto,
    //     },
    //   );
  
    //   const { result, total } = await this.queryBus.execute<
    //     ProductFindManyQuery,
    //     ProductFindManyQueryResult
    //   >(builder.build());
  
    //   responseBuilder.data(result);
    //   responseBuilder.page(page);
    //   responseBuilder.per_page(limit);
    //   responseBuilder.total(total);
  
    //   return basePaginatedResponseHelper(res, responseBuilder.build());
    // }
  
    // @Get(':id')
    // async findById(@Res() res: Response, @Param('id') id: string) {
    //   const responseBuilder =
    //     Builder<BaseHttpResponseDto<ProductEntity, any>>(
    //       BaseHttpResponseDto,
    //     );
    //   responseBuilder.statusCode(200);
    //   responseBuilder.message('Product Fetched Successfully');
  
    //   const query = Builder<ProductFindByIdQuery>(
    //     ProductFindByIdQuery,
    //     {
    //       id,
    //     },
    //   ).build();
  
    //   const result = await this.queryBus.execute(query);
  
    //   responseBuilder.data(result);
  
    //   return baseHttpResponseHelper(res, responseBuilder.build());
    // }
  
    @Post('update')
    async update(@Res() res: Response, @Body() dto: ProductUpdateDto) {
      try {
           const command = Builder<ProductUpdateCommand>(
               ProductUpdateCommand,
           {
                ...dto,
           },
           ).build();

       const result = await this.commandBus.execute<
           ProductUpdateCommand,
           ProductUpdateCommandResult
       >(command);

       return result;
         } catch (e) {
           throw e;
         }
   }
}