import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { Inject } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/category.repository';
import { CategoryEntity } from 'src/modules/product-management/category/entity/category.entity';

export class CategoryFindManyQuery {
  page?: number;
  limit?: number;
}

export class CategoryFindManyQueryResult {
  data: CategoryEntity[];
  total: number;
}

@QueryHandler(CategoryFindManyQuery)
export class CategoryFindManyQueryHandler
  implements IQueryHandler<CategoryFindManyQuery, CategoryFindManyQueryResult>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
  ) {}
  async execute(
    query: CategoryFindManyQuery,
  ): Promise<CategoryFindManyQueryResult> {
    const category = await this.categoryRepository.findMany({
      ...query,
    });
    const total = await this.categoryRepository.countMany({
      ...query,
    });

    return Builder<CategoryFindManyQueryResult>(CategoryFindManyQueryResult)
      .data(category)
      .total(total)
      .build();
  }
}
