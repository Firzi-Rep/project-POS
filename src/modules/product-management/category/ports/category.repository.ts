import { CategoryEntity } from '../entity/category.entity';
import { CreateCategoryProps } from '../types';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface CategoryFindManyQueryProps {
  limit?: number;
  page?: number;
}

export interface CategoryRepository {
  create(props: CreateCategoryProps): Promise<CategoryEntity>;

  findById(id: string): Promise<CategoryEntity>;

  findMany(props?: CategoryFindManyQueryProps): Promise<CategoryEntity[]>;

  countMany(props?: CategoryFindManyQueryProps): Promise<number>;
}
