import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MenuRepository } from '../ports/menu.repository';

export class MenuDeleteCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(MenuDeleteCommand)
export class MenuDeleteCommandHandler
  implements ICommandHandler<MenuDeleteCommand>
{
  constructor(
    @Inject('MENU_REPOSITORY') // inject menu repository (as a connection to db)
    private readonly menuRepo: MenuRepository,
  ) {}

  async execute(command: MenuDeleteCommand): Promise<any> {
    const { id } = command;

    const menu = await this.menuRepo.findById(id);
    if (!menu) {
      throw new Error('Menu not found');
    }

    await this.menuRepo.deleteById(id);

    return { message: 'Menu deleted successfully' };
  }
}
