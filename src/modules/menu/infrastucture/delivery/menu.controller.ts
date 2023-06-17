import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Response,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { MenuCreateCommand } from '../../application/commands/menu.create.command';
import { CreateMenuRequest } from '../dtos/requests/create.menu.request';
import { GetMenuQueryRequest } from '../dtos/requests/get.menu.query.request';
import { UpdateMenuRequest } from '../dtos/requests/update.menu.request';
import { MenuUpdateCommand } from '../../application/commands/menu.update.command';
import { MenuDeleteCommand } from '../../application/commands/menu.delete.command';
import { DeleteMenuRequest } from '../dtos/requests/delete.menu.request';
import { MenuDetailQuery } from '../../application/query/menu.detail.query';

// localhost:3000/menus
@Controller('menus')
export class MenuController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  // [POST] localhost:3000/menus/create
  @Post('create')
  // validating the payload via DTO (CreateMenuRequest)
  async create(@Body() request: CreateMenuRequest) {
    // enter the controller

    // build the command request (transforming the dto into payload that required by the command)
    const createMenuCommand = Builder<MenuCreateCommand>(MenuCreateCommand, {
      // u can transformt the dto into payload that u needed here.
      ...request,
    }).build();

    // execute the command (entering business logic)
    const result = await this.commandBus.execute(createMenuCommand);
    return result;
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const query = new MenuDetailQuery(id);
    const result = await this.queryBus.execute(query);

    return {
      name: result.name,
      price: result.price,
    };
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() request: UpdateMenuRequest) {
    const { name, price } = request;
    const updateMenuCommand = new MenuUpdateCommand(id, name, price);
    const result = await this.commandBus.execute(updateMenuCommand);

    return result;
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const deleteMenuCommand = new MenuDeleteCommand(id);
    const result = await this.commandBus.execute(deleteMenuCommand);

    return result;
  }
}
