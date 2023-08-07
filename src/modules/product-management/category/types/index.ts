import { ProductEntity } from '../../product/domain/product.entity';

export interface CreateCategoryProps {
  id?: string;
  name: string;
}

export interface UpdateCategoryProps {
  id: string;
  name: string;
}
