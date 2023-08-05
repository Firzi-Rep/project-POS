import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { Builder } from 'builder-pattern';
import { ProductRepository } from '../../application/ports/product.repository';
import {
  CreateProductProps,
  UpdateProductProps,
} from '../../application/types';
import { ProductEntity } from '../../domain/product.entity';

@Injectable()
export class ProductMongoAdapter implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    props: CreateProductProps,
    session?: PrismaService,
  ): Promise<ProductEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;
      // console.log('masuk adapter', props)
      const result = await prisma.product.create({
        data: {
          name: props.name,
          price: props.price,
          cat_product_id: props.cat_product_id,
        },
      });

      // console.log('masuk adapter', result )
      const entity = Builder<ProductEntity>(ProductEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(
    props: UpdateProductProps,
    session?: PrismaService,
  ): Promise<ProductEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;

      const result = await prisma.product.update({
        where: {
          id: props.id,
        },
        data: {
          name: props.name,
          price: props.price,
          cat_product_id: props.category_id,
        },
      });

      const entity = Builder<ProductEntity>(ProductEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string, session?: PrismaService): Promise<ProductEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;

    const result = await prisma.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new Error('Menu not found');
    }

    const entity = Builder<ProductEntity>(ProductEntity, {
      ...result,
    }).build();

    return entity;
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.prismaService.menu.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
