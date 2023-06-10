import { CommandHandler, ICommandHandler, ICommand } from "@nestjs/cqrs";
import { MenuModel, UpdateMenuRequest } from "../../infrastucture/dtos/requests/update.menu.request";
import { Inject } from "@nestjs/common";
import { MenuRepository } from "../ports/menu.repository";

export class MenuUpdateCommand {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly price: number,
      // Tambahkan properti lain yang diperlukan untuk pembaruan menu
    ) {}
  }

    @CommandHandler(MenuUpdateCommand)
export class MenuUpdateCommandHandler implements ICommandHandler<MenuUpdateCommand> {
  // Implementasikan metode execute untuk menangani perintah
  async execute(command: MenuUpdateCommand): Promise<any> {
    // Logika pembaruan menu di sini

    return command
  }

    
}