import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { CategoryEntity } from '../entity/category.entity';
import { CreateCategoryProps, UpdateCategoryProps } from '../types';
import {
  CategoryFindManyQueryProps,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/category.repository';
import { ProductEntity } from 'src/modules/product-management/product/domain/product.entity';
@Injectable()
export class CategoryMongoAdapter implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    props: CreateCategoryProps,
    session?: PrismaService,
  ): Promise<CategoryEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;
    try {
      const rawCreated = await prisma.categoryProduct.create({
        data: {
          id: props.id,
          name: props.name,
        },
      });

      const createdEntity = Builder<CategoryEntity>(CategoryEntity, {
        ...rawCreated,
      }).build();

      //  console.log("created entity",createdEntity)
      return createdEntity;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  async findById(id: string, session?: PrismaService): Promise<CategoryEntity> {
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

    // const entity = Builder<ProductEntity>(ProductEntity, {
    //   ...result,
    //   category: categoryEntity,
    // }).build();

    return categoryEntity;
  }

  async findMany(props: CategoryFindManyQueryProps): Promise<CategoryEntity[]> {
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

      // return Builder<ProductEntity>(ProductEntity, {
      //   ...item,
      //   category: categoryEntity,
      // }).build();
      return categoryEntity;
    });

    return entity;
  }

  async countMany(props: CategoryFindManyQueryProps): Promise<number> {
    const result = await this.prismaService.categoryProduct.count();

    return result;
  }

  async update(
    props: UpdateCategoryProps,
    session?: PrismaService,
  ): Promise<CategoryEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;

      const result = await prisma.categoryProduct.update({
        where: {
          id: props.id,
        },
        data: {
          name: props.name,
        },
      });

      const entity = Builder<CategoryEntity>(CategoryEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMany(ids: string[]): Promise<void> {
    try {
      await this.prismaService.categoryProduct.deleteMany({
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

  //    async update(props: UpdateProps, session?: PrismaService): Promise<Entity> {
  //       let prisma = this.prismaService;
  //       if (session) prisma = session;
  //       try {
  //           const rawUpdated = await prisma..update({
  //                where: {},
  //                data: {}
  //            });

  //            const updatedEntity = Builder<Entity>(
  //                Entity,
  //                {
  //                    ...rawUpdated,
  //                },
  //            ).build();
  //            return updatedEntity;
  //       } catch (error) {
  //       console.trace(error);
  //           throw error;
  //       }
  //    }

  // async findById(: string, session?: PrismaService): Promise<CategoryEntity | null> {
  //    let prisma = this.prismaService;
  //    if (session) prisma = session;
  //    try {
  //         const result = await prisma..findFirst({
  //             where: { :  },
  //         });
  //         if(!result) return null
  //        return Builder<CategoryEntity>(CategoryEntity, {
  //            ...result,
  //        }).build();
  //    } catch (error) {
  //    console.trace(error);
  //        throw error;
  //    }
  // }

  // async findMany(props: FindManyProps, session?: PrismaService): Promise<Entity[]> {
  //    let prisma = this.prismaService;
  //    if (session) prisma = session;
  //    try {
  //        const { limit = 0, page = 0, sort_by, sort_direction } = props;
  //        const offset = (page - 1) * limit;
  //        const getSortBy = sort_by ? sort_by : 'created_at';
  //        const getSortDirection = sort_direction ? sort_direction : 'desc';

  //        let queryOptions: Prisma.ProductFindManyArgs = {
  //        where: clause,

  //        orderBy: {
  //            [getSortBy]: getSortDirection,
  //        },
  // };

  //        if (limit > 0) {
  //        queryOptions = {
  //            ...queryOptions,
  //            skip: offset,
  //            take: limit,
  //        };
  // }

  //    const rawProducts = await prisma.product.findMany(queryOptions);
  //    const productEntities = rawProducts.map((rawProducts) => {
  //    return Builder<CatalogProductEntity>(CatalogProductEntity, {
  //           ...rawProducts,
  //    }).build();
  // });

  //    } catch (error) {
  //    console.trace(error);
  //        throw error;
  //    }
  // }

  // async countMany(props: FindManyProps, session?: PrismaService): Promise<number> {
  //    let prisma = this.prismaService;
  //    if (session) prisma = session;
  //    try {

  //    } catch (error) {
  //    console.trace(error);
  //        throw error;
  //    }
  // }
}
