import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/category.repository';

export class CategoryDeleteCommand {
  ids: string[];
}

export class CategoryDeleteCommandResult {}

@CommandHandler(CategoryDeleteCommand)
export class CategoryDeleteCommandHandler
  implements
    ICommandHandler<CategoryDeleteCommand, CategoryDeleteCommandResult>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
  ) {}
  async execute(
    command: CategoryDeleteCommand,
  ): Promise<CategoryDeleteCommandResult> {
    await this.categoryRepository.deleteMany(command.ids);

    return Builder<CategoryDeleteCommandResult>(
      CategoryDeleteCommandResult,
    ).build();
  }
}
