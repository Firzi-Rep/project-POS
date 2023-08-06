export interface CreateProductProps {
  name: string;
  price: number;
  category_id?: string;
}

export interface QueryProductProps {
  name: string;
  price: number;
}

export interface UpdateProductProps {
  id: string;
  name: string;
  price: number;
  category_id?: string;
}
