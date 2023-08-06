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
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { Response, response } from 'express';
import {
  ProductCreateCommand,
  ProductCreateCommandResult,
} from '../../application/command/product.create.command';
import { ProductCreateDto } from '../dto/product.create.dto';
import { ProductUpdateDto } from '../dto/product.update.dto';
import {
  ProductUpdateCommand,
  ProductUpdateCommandResult,
} from '../../application/command/product.update.command';
import { ProductDetailQuery } from 'src/modules/product-management/product/application/query/product.detail.query';
import { ProductEntity } from 'src/modules/product-management/product/domain/product.entity';
import {
  baseHttpResponseHelper,
  basePaginatedResponseHelper,
} from '../../../../../core/helpers/base.response.helper';
import { ProductFindManyQueryDto } from '../dto/product.find.many.query.dto';
import {
  ProductFindManyQuery,
  ProductFindManyQueryResult,
} from '../../application/query/product.find.many.query';
import {
  ProductDeleteCommand,
  ProductDeleteCommandResult,
} from '../../application/command/product.delete.command';
import { ProductDeleteManyDto } from '../dto/product.delete.many.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-management/products')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: ProductCreateDto) {
    try {
      // console.log("masuk ke controller create product dengan payload",dto)
      const command = Builder<ProductCreateCommand>(ProductCreateCommand, {
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        ProductCreateCommand,
        ProductCreateCommandResult
      >(command);

      return {
        statusCode: 201,
        message: 'success',
        data: result.product,
      };
    } catch (e) {
      console.trace(e);
      throw e;
    }
  }

  @Get()
  async findMany(@Res() res: Response, @Query() dto: ProductFindManyQueryDto) {
    const builder = Builder<ProductFindManyQuery>(ProductFindManyQuery, {
      ...dto,
    });

    const { data, total } = await this.queryBus.execute<
      ProductFindManyQuery,
      ProductFindManyQueryResult
    >(builder.build());

    return basePaginatedResponseHelper(res, {
      data: data,
      total,
      page: dto.page,
      per_page: dto.limit,
    });
  }

  @Post('delete-many')
  async deleteMany(@Body() dto: ProductDeleteManyDto) {
    // console.log("masuk ke controller create product dengan payload",dto)
    const command = Builder<ProductDeleteCommand>(ProductDeleteCommand, {
      ...dto,
    }).build();

    await this.commandBus.execute<
      ProductDeleteCommand,
      ProductDeleteCommandResult
    >(command);

    return {
      statusCode: 200,
      message: 'success',
      data: null,
    };
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param('id') id: string) {
    try {
      const query = Builder<ProductDetailQuery>(ProductDetailQuery, {
        id,
      }).build();

      const result = await this.queryBus.execute(query);

      // console.trace("result",result)

      return baseHttpResponseHelper(res, {
        data: result,
      });
    } catch (e) {
      console.trace(e);
    }
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() dto: ProductUpdateDto,
    @Param('id') id: string,
  ) {
    try {
      const command = Builder<ProductUpdateCommand>(ProductUpdateCommand, {
        ...dto,
        id,
      }).build();

      const result = await this.commandBus.execute<
        ProductUpdateCommand,
        ProductUpdateCommandResult
      >(command);

      return baseHttpResponseHelper(res, {
        data: result,
      });
    } catch (e) {
      throw e;
    }
  }
}
