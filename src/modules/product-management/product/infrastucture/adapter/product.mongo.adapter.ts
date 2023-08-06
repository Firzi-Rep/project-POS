import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { Builder } from 'builder-pattern';
import {
  ProductFindManyQueryProps,
  ProductRepository,
} from '../../application/ports/product.repository';
import {
  CreateProductProps,
  UpdateProductProps,
} from '../../application/types';
import { ProductEntity } from '../../domain/product.entity';
import { CategoryEntity } from '../../../category/entity/category.entity';

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
          category_id: props.category_id,
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
          category_id: props.category_id,
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

    const result = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });

    if (!result) {
      return null;
    }

    const categoryEntity = Builder<CategoryEntity>(CategoryEntity, {
      ...result.category,
    }).build();

    const entity = Builder<ProductEntity>(ProductEntity, {
      ...result,
      category: categoryEntity,
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

  async deleteMany(ids: string[]): Promise<void> {
    try {
      await this.prismaService.product.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findMany(props: ProductFindManyQueryProps): Promise<ProductEntity[]> {
    const { page, limit } = props;

    const getLimit = limit ? limit : 10;
    const getPage = page ? page : 1;
    const offset = (getPage - 1) * getLimit;

    const result = await this.prismaService.product.findMany({
      skip: offset,
      take: getLimit,
      include: {
        category: true,
      },
    });

    const entity = result.map((item) => {
      const categoryEntity = Builder<CategoryEntity>(CategoryEntity, {
        ...item.category,
      }).build();

      return Builder<ProductEntity>(ProductEntity, {
        ...item,
        category: categoryEntity,
      }).build();
    });

    return entity;
  }

  async countMany(props: ProductFindManyQueryProps): Promise<number> {
    const result = await this.prismaService.product.count();

    return result;
  }
}
