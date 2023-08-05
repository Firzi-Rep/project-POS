import { ProductEntity } from '../../domain/product.entity';
import { CreateProductProps, UpdateProductProps } from '../types';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductRepository {
  create(props: CreateProductProps): Promise<ProductEntity>;

  findById(id: string): Promise<ProductEntity>;

  update(props: UpdateProductProps): Promise<ProductEntity>;

  deleteById(id: string): Promise<void>;
}