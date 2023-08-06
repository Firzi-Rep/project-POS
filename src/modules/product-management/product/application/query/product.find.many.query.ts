import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { ProductEntity } from '../../domain/product.entity';
import { Inject } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../ports/product.repository';

export class ProductFindManyQuery {
  page?: number;
  limit?: number;
}

export class ProductFindManyQueryResult {
  data: ProductEntity[];
  total: number;
}

@QueryHandler(ProductFindManyQuery)
export class ProductFindManyQueryHandler
  implements IQueryHandler<ProductFindManyQuery, ProductFindManyQueryResult>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
  ) {}
  async execute(
    query: ProductFindManyQuery,
  ): Promise<ProductFindManyQueryResult> {
    const products = await this.productRepository.findMany({
      ...query,
    });
    const total = await this.productRepository.countMany({
      ...query,
    });

    return Builder<ProductFindManyQueryResult>(ProductFindManyQueryResult)
      .data(products)
      .total(total)
      .build();
  }
}
