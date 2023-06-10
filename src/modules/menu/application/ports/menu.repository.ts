import { MenuEntity } from "../../domain/menu.entity";
import { CreateMenuProps, QueryMenuProps } from "../types";

export const MENU_REPOSITORY = 'MENU_REPOSITORY';

export interface MenuRepository {
    create(props: CreateMenuProps): Promise<MenuEntity>

    update(props: any)
}

export interface MenuRepository {
    // ...
    findById(id: string): Promise<MenuEntity>;
    // ...
  }