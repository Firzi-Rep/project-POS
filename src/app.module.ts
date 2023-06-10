import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './modules/shared/shared.module';
import { MenuUpdateCommandHandler } from './modules/menu/application/commands/menu.update.command';
import { GetMenuQueryHandler } from './modules/menu/application/commands/menu.query.command';
import { MenuCreateCommandHandler } from './modules/menu/application/commands/menu.create.command';
import { MenuMongoAdapter } from './modules/menu/infrastucture/adapter/menu.mongo.adapter';
import { PrismaService } from './modules/shared/prisma/prisma.service';
import { MenuController } from './modules/menu/infrastucture/delivery/menu.controller';

@Module({
  imports: [CqrsModule,SharedModule, MenuModule],
  controllers: [AppController, MenuController],
  providers: [{
    provide: 'MENU_REPOSITORY',
    useClass: MenuMongoAdapter,
  },
    AppService,
    GetMenuQueryHandler,
    MenuUpdateCommandHandler,
    MenuMongoAdapter,
    PrismaService,
  ],
})
export class AppModule {}
