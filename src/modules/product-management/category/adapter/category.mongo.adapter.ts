import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { CategoryEntity } from '../entity/category.entity';
import { CreateCategoryProps } from '../types';
@Injectable()
export class CategoryMongoAdapter {
   constructor(private readonly prismaService: PrismaService) {}

   async create(props: CreateCategoryProps, session?: PrismaService): Promise<CategoryEntity> {
      let prisma = this.prismaService;
      if (session) prisma = session;
      try {
          const rawCreated = await prisma.categoryProduct.create({
               data: {
                id: props.id,
                name: props.name,
               }
           });

           const createdEntity = Builder<CategoryEntity>(
               CategoryEntity,
               {
                   ...rawCreated,
               },
           ).build();

           console.log("created entity",createdEntity)
           return createdEntity;
      } catch (error) {
          console.trace(error);
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