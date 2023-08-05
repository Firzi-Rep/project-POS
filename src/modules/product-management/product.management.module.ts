import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

const importedModule = [CqrsModule, CategoryModule, ProductModule];

@Module({
   imports: [...importedModule],
})
export class ProductManagementModule {}