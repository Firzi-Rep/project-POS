import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { Inject } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../ports/product.repository';

export class ProductDeleteCommand {
  ids: string[];
}

export class ProductDeleteCommandResult {}

@CommandHandler(ProductDeleteCommand)
export class ProductDeleteCommandHandler
  implements ICommandHandler<ProductDeleteCommand, ProductDeleteCommandResult>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
  ) {}
  async execute(
    command: ProductDeleteCommand,
  ): Promise<ProductDeleteCommandResult> {
    await this.productRepository.deleteMany(command.ids);

    return Builder<ProductDeleteCommandResult>(
      ProductDeleteCommandResult,
    ).build();
  }
}
