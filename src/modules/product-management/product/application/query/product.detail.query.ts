import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductRepository } from '../ports/product.repository';

export class ProductDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ProductDetailQuery)
export class ProductDetailQueryHandler
  implements IQueryHandler<ProductDetailQuery>
{
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(query: ProductDetailQuery): Promise<any> {
    const productId = query.id;
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found!');
    }
    return product;
  }
}
