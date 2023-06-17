import { Module, Provider } from '@nestjs/common';
import { MenuController } from './infrastucture/delivery/menu.controller';
import { MenuCreateCommandHandler } from './application/commands/menu.create.command';
import { CqrsModule } from '@nestjs/cqrs';
import { MENU_REPOSITORY } from './application/ports/menu.repository';
import { MenuMongoAdapter } from './infrastucture/adapter/menu.mongo.adapter';
import { MenuUpdateCommandHandler } from './application/commands/menu.update.command';
import { MenuDeleteCommandHandler } from './application/commands/menu.delete.command';
import { MenuDetailQueryHandler } from './application/query/menu.detail.query';

const repositories: Provider[] = [
  {
    provide: MENU_REPOSITORY,
    useClass: MenuMongoAdapter,
  },
];
const commands: Provider[] = [
  MenuCreateCommandHandler,
  MenuUpdateCommandHandler,
  MenuDeleteCommandHandler,
];

const queryHandlers: Provider[] = [MenuDetailQueryHandler];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [MenuController],
  exports: [],
})
export class MenuModule {}
