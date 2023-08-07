import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CATEGORY_REPOSITORY } from './ports/category.repository';
import { CategoryMongoAdapter } from './adapter/category.mongo.adapter';
import { CategoryCreateCommandHandler } from './command/category.create.command';
import { CategoryController } from './controller/category.controller';
import { CategoryFindManyQueryHandler } from 'src/modules/product-management/category/queries/category.find.many.query';
import { CategoryUpdateCommandHandler } from 'src/modules/product-management/category/command/category.update.command';
import { CategoryDeleteCommandHandler } from 'src/modules/product-management/category/command/category.delete.command';

const repositories: Provider[] = [
  {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryMongoAdapter,
  },
];
const commands: Provider[] = [
  CategoryCreateCommandHandler,
  CategoryUpdateCommandHandler,
  CategoryDeleteCommandHandler,
  //   ProductUpdateCommandHandler,
];

const queryHandlers: Provider[] = [
  CategoryCreateCommandHandler,
  CategoryFindManyQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
