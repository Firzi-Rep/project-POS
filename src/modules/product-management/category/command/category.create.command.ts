import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryMongoAdapter } from '../adapter/category.mongo.adapter';
import { CategoryEntity } from '../entity/category.entity';
import { CATEGORY_REPOSITORY } from '../ports/category.repository';
export class CategoryCreateCommand {
  name: string;
}

export class CategoryCreateCommandResult {
  category: CategoryEntity;
}

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateCommandHandler
  implements
    ICommandHandler<CategoryCreateCommand, CategoryCreateCommandResult>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryMongoAdapter: CategoryMongoAdapter,
  ) {}

  async execute(command: CategoryCreateCommand) {
    // console.log('masuk command product create ni bos wkwkwk' )
    const result = await this.categoryMongoAdapter.create({ ...command });

    return {
      category: result,
    };
  }
}
