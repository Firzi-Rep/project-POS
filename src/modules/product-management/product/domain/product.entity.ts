import { CategoryEntity } from '../../category/entity/category.entity';

export class ProductEntity {
  _id?: string;
  name: string;
  price: number;
  category_id?: string;
  category?: CategoryEntity;
}
