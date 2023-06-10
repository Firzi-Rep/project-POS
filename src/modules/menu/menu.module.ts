import { Module, Provider } from "@nestjs/common";
import { MenuController } from "./infrastucture/delivery/menu.controller";
import { MenuCreateCommandHandler } from "./application/commands/menu.create.command";
import { CqrsModule } from "@nestjs/cqrs";
import { MENU_REPOSITORY } from "./application/ports/menu.repository";
import { MenuMongoAdapter } from "./infrastucture/adapter/menu.mongo.adapter";

const repositories: Provider[] = [
    {
        provide: MENU_REPOSITORY,
        useClass: MenuMongoAdapter,
    }
]
const commands: Provider[] = [
    MenuCreateCommandHandler
]

@Module({
    imports: [CqrsModule],
    providers: [...commands, ...repositories],
    controllers: [MenuController],
    exports: []
})
export class MenuModule {
}
