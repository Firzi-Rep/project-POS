import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryEntity } from 'src/modules/product-management/category/entity/category.entity';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/category.repository';

export class CategoryUpdateCommand {
  id: string;
  name: string;
}

export class CategoryUpdateCommandResult {
  product: CategoryEntity;
}

@CommandHandler(CategoryUpdateCommand)
export class CategoryUpdateCommandHandler
  implements ICommandHandler<CategoryUpdateCommand>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY) // inject menu repository (as a connection to db)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(command: CategoryUpdateCommand): Promise<any> {
    const { id, name } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.categoryRepository.update({ id, name });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Category updated successfully' };
  }
}
