import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuQueryRequest } from '../../infrastucture/dtos/requests/get.menu.query.request';
import { MenuRepository } from '../ports/menu.repository';
import { Inject } from '@nestjs/common';

export class MenuDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(MenuDetailQuery)
export class MenuDetailQueryHandler implements IQueryHandler<MenuDetailQuery> {
  constructor(
    @Inject('MENU_REPOSITORY')
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(query: MenuDetailQuery): Promise<any> {
    const menuId = query.id;
    const menu = await this.menuRepository.findById(menuId);
    if (!menu) {
      throw new Error('Menu not found');
    }
    return menu;
  }
}
