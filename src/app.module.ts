import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './modules/menu/menu.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './modules/shared/shared.module';
import { MenuController } from './modules/menu/infrastucture/delivery/menu.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
@Module({
  imports: [CqrsModule, SharedModule, MenuModule, AuthModule, UsersModule],
  controllers: [AppController, MenuController],
  providers: [AppService, UsersService],
})
export class AppModule {}
