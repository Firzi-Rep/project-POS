import { ProductEntity } from '../../domain/product.entity';
import { CreateProductProps, UpdateProductProps } from '../types';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductFindManyQueryProps {
  limit?: number;
  page?: number;
}

export interface ProductRepository {
  create(props: CreateProductProps): Promise<ProductEntity>;

  findById(id: string): Promise<ProductEntity>;

  findMany(props?: ProductFindManyQueryProps): Promise<ProductEntity[]>;

  countMany(props?: ProductFindManyQueryProps): Promise<number>;

  update(props: UpdateProductProps): Promise<ProductEntity>;

  deleteById(id: string): Promise<void>;

  deleteMany(ids: string[]): Promise<void>;
}
