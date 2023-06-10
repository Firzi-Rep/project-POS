import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMenuQueryRequest } from "../../infrastucture/dtos/requests/get.menu.query.request";
import { MenuRepository } from "../ports/menu.repository";
import { Inject } from "@nestjs/common";

export class MenuQueryCommand {
    constructor(public readonly id: string) {}
  }

  @QueryHandler(GetMenuQueryRequest)
export class GetMenuQueryHandler implements IQueryHandler<MenuQueryCommand> {
    constructor(
        @Inject('MENU_REPOSITORY') // inject menu repository (as a connection to db)
        private readonly menuRepo: MenuRepository
    ) {}

    async execute(query: MenuQueryCommand) {
        return await this.menuRepo.findById(query.id);
    }
  }
