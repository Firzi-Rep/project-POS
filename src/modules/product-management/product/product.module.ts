import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository';
import { ProductCreateCommandHandler } from './application/command/product.create.command';
import { ProductUpdateCommandHandler } from './application/command/product.update.command';
import { ProductController } from './infrastucture/delivery/product.http.controller';
import { ProductDetailQueryHandler } from './application/query/product.detail.query';
import { ProductMongoAdapter } from './infrastucture/adapter/product.mongo.adapter';

const repositories: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductMongoAdapter,
  },
];
const commands: Provider[] = [
  ProductCreateCommandHandler,
  ProductUpdateCommandHandler,
];

const queryHandlers: Provider[] = [ProductDetailQueryHandler];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}
