import { Inject } from "@nestjs/common";
import { CommandBus, CommandHandler, ICommandHandler, IQuery } from "@nestjs/cqrs";
import { MenuRepository } from "../ports/menu.repository";
import { CreateMenuProps } from "../types";
import { Builder } from "builder-pattern";

export class MenuCreateCommand {
     name: string;
     price: number;
}

/* business logic (manipulate data) */
@CommandHandler(MenuCreateCommand)
export class MenuCreateCommandHandler implements ICommandHandler<MenuCreateCommand>{
    constructor(
        @Inject('MENU_REPOSITORY') // inject menu repository (as a connection to db)
        private readonly menuRepo: MenuRepository
    ){}

    async execute(command: MenuCreateCommand){
    await this.menuRepo.create(command);
    // const payload: CreateMenuProps = {
    //     name: command.name,
    //     price: command.price
    // }
    // await this.menuRepo.create(payload);

    // const payload = Builder<CreateMenuProps>(command, {
    //     name: command.name,
    //     price: command.price
    // }).build();

    // await this.menuRepo.create(payload);
    }

}