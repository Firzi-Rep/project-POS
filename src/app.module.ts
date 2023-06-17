import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './modules/shared/shared.module';
import { MenuController } from './modules/menu/infrastucture/delivery/menu.controller';
@Module({
  imports: [CqrsModule, SharedModule, MenuModule],
  controllers: [AppController, MenuController],
  providers: [AppService],
})
export class AppModule {}
