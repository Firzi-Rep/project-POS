import { CategoryEntity } from "../entity/category.entity";
import { CreateCategoryProps } from "../types";

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface ProductRepository {
  create(props: CreateCategoryProps): Promise<CategoryEntity>;
}