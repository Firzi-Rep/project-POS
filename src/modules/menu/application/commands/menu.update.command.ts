import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MenuRepository } from "../ports/menu.repository";
import { Inject } from "@nestjs/common";

export class MenuUpdateCommand {
  constructor(public readonly id: string, public readonly name: string, public readonly price: number) {}
}

@CommandHandler(MenuUpdateCommand)
export class MenuUpdateCommandHandler implements ICommandHandler<MenuUpdateCommand> {
  constructor (
    @Inject('MENU_REPOSITORY')
    private readonly menuRepo: MenuRepository
  ) {}

  async execute(command: MenuUpdateCommand): Promise<any> {
    const { id, name, price } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.menuRepo.update({ id, name, price });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Menu updated successfully' };
  }
}