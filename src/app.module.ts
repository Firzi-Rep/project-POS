import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { ProductModule } from './modules/product-management/product/product.module';
import { ProductController } from './modules/product-management/product/infrastucture/delivery/product.http.controller';
import { CategoryModule } from './modules/product-management/category/category.module';
import { ProductManagementModule } from './modules/product-management/product.management.module';
@Module({
  imports: [CqrsModule, SharedModule, AuthModule, UsersModule, ProductManagementModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
