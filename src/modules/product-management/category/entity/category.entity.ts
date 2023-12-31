import { ProductEntity } from '../../product/domain/product.entity';

export class CategoryEntity {
  // id                 String    @id @default(auto()) @map("_id") @db.ObjectId()
  // name               String    // Category Product Name: makanan & minuman
  // created_at         DateTime  @default(now())
  // updated_at         DateTime  @updatedAt
  // Product            Product[]
  id?: string;
  name: string;
  created_at?: Date = new Date();
  updated_at?: Date = new Date();
  product: ProductEntity;
}
