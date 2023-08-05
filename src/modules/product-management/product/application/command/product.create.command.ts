import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductRepository } from "../ports/product.repository";
import { ProductEntity } from "../../domain/product.entity";

export class ProductCreateCommand {
    name: string;
    price: number;
}

export class ProductCreateCommandResult {
  product: ProductEntity;
}

@CommandHandler(ProductCreateCommand)
export class ProductCreateCommandHandler
    implements ICommandHandler<ProductCreateCommand>
    {
        constructor(
            @Inject('PRODUCT_REPOSITORY') // inject menu repository (as a connection to db)
            private readonly productRepo: ProductRepository,
          ) {}

          async execute(command: ProductCreateCommand) {
            // console.log('masuk command product create ni bos wkwkwk' )
            const product = await this.productRepo.create(command);

            return {
              product,
            }
          }
    }