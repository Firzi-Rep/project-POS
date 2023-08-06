import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductEntity } from '../../domain/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../ports/product.repository';
import { Inject } from '@nestjs/common';
import { ProductMongoAdapter } from 'src/modules/product-management/product/infrastucture/adapter/product.mongo.adapter';

export class ProductUpdateCommand {
  id: string;
  name: string;
  price: number;
  category_id?: string;
}

export class ProductUpdateCommandResult {
  product: ProductEntity;
}

@CommandHandler(ProductUpdateCommand)
export class ProductUpdateCommandHandler
  implements ICommandHandler<ProductUpdateCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) // inject menu repository (as a connection to db)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: ProductUpdateCommand): Promise<any> {
    const { id, name, price, category_id } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.productRepository.update({ id, name, price, category_id });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Menu updated successfully' };
  }
}
