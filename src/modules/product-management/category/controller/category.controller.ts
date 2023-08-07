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
import { Response } from 'express';
import {
  CategoryCreateCommand,
  CategoryCreateCommandResult,
} from '../command/category.create.command';
import { CategoryCreateDto } from '../dto/category.create.dto';
import { CategoryFindManyQueryDto } from 'src/modules/product-management/category/dto/category.find.many.query.dto';
import { CategoryDetailQuery } from 'src/modules/product-management/category/queries/category.detail.query';
import {
  CategoryFindManyQuery,
  CategoryFindManyQueryResult,
} from 'src/modules/product-management/category/queries/category.find.many.query';
import { basePaginatedResponseHelper } from 'src/core/helpers/base.response.helper';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-management/category')
@ApiTags('Category')
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async create(@Body() dto: CategoryCreateDto) {
    try {
      const command = Builder<CategoryCreateCommand>(CategoryCreateCommand, {
        // category_name: dto.name
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        CategoryCreateCommand,
        CategoryCreateCommandResult
      >(command);

      // console.log('result on controller', result);
      return {
        statusCode: 201,
        message: 'success',
        data: result.category,
      };
    } catch (e) {
      console.trace(e);
      throw e;
    }
  }

  @Get()
  async findMany(@Res() res: Response, @Query() dto: CategoryFindManyQueryDto) {
    const builder = Builder<CategoryFindManyQuery>(CategoryFindManyQuery, {
      ...dto,
    });

    const { data, total } = await this.queryBus.execute<
      CategoryFindManyQuery,
      CategoryFindManyQueryResult
    >(builder.build());

    return basePaginatedResponseHelper(res, {
      data: data,
      total,
      page: dto.page,
      per_page: dto.limit,
    });
  }

  //     @Get()
  //     async findMany(
  //       @Res() res: Response,
  //       @Query() dto: FindManyQueryDto,
  //     ) {
  //       const { page, limit } = dto;

  //       const responseBuilder = Builder<
  //         BaseHttpPaginatedResponseDto<Entity[], any>
  //       >(BaseHttpPaginatedResponseDto);
  //       responseBuilder.statusCode(200);
  //       responseBuilder.message(' List Fetched Successfully!');

  //       const builder = Builder<FindManyQuery>(
  //         FindManyQuery,
  //         {
  //           ...dto,
  //         },
  //       );

  //       const { result, total } = await this.queryBus.execute<
  //         FindManyQuery,
  //         FindManyQueryResult
  //       >(builder.build());

  //       responseBuilder.data(result);
  //       responseBuilder.page(page);
  //       responseBuilder.per_page(limit);
  //       responseBuilder.total(total);

  //       return basePaginatedResponseHelper(res, responseBuilder.build());
  //     }

  //     @Get(':id')
  //     async findById(@Res() res: Response, @Param('id') id: string) {
  //       const responseBuilder =
  //         Builder<BaseHttpResponseDto<Entity, any>>(
  //           BaseHttpResponseDto,
  //         );
  //       responseBuilder.statusCode(200);
  //       responseBuilder.message(' Fetched Successfully');

  //       const query = Builder<FindByIdQuery>(
  //         FindByIdQuery,
  //         {
  //           id,
  //         },
  //       ).build();

  //       const result = await this.queryBus.execute(query);

  //       responseBuilder.data(result);

  //       return baseHttpResponseHelper(res, responseBuilder.build());
  //     }

  //     @UseGuards(TenderJwtGuard)
  //     @Post('update')
  //     async update(@Res() res: Response, @Body() dto: UpdateDto) {
  //       try {
  //            const command = Builder<Command>(
  //                UpdateCommand,
  //            {
  //                 ...dto,
  //            },
  //            ).build();

  //        const result = await this.commandBus.execute<
  //            UpdateCommand,
  //            UpdateCommandResult
  //        >(command);

  //        return baseHttpResponseHelper(res, {
  //            data: result,
  //            message: ' Updated Successfully!',
  //            statusCode: HttpStatus.OK,
  //        });
  //          } catch (e) {
  //            throw e;
  //          }
  //    }
}
