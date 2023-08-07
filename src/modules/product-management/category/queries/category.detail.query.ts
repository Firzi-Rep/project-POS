import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/category.repository';

export class CategoryDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(CategoryDetailQuery)
export class CategoryDetailQueryHandler
  implements IQueryHandler<CategoryDetailQuery>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(query: CategoryDetailQuery): Promise<any> {
    const productId = query.id;

    // console.trace('product detail query', productId);
    const product = await this.categoryRepository.findById(productId);
    // console.trace(product);
    // if (!product) {
    //   // throw new Error('Product not found!');
    // }
    return product;
  }
}
