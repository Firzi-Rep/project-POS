import { MenuEntity } from '../../domain/menu.entity';
import { CreateMenuProps, UpdateMenuProps } from '../types';

export const MENU_REPOSITORY = 'MENU_REPOSITORY';

export interface MenuRepository {
  create(props: CreateMenuProps): Promise<MenuEntity>;

  findById(id: string): Promise<MenuEntity>;

  update(props: UpdateMenuProps): Promise<MenuEntity>;

  deleteById(id: string): Promise<void>;
}
