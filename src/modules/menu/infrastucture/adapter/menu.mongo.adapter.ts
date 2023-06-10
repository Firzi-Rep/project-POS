import { Injectable } from "@nestjs/common";
import { MenuRepository } from "../../application/ports/menu.repository";
import { CreateMenuProps, QueryMenuProps } from "../../application/types";
import { MenuEntity } from "../../domain/menu.entity";
import { PrismaService } from "src/modules/shared/prisma/prisma.service";
import { Builder } from "builder-pattern";

@Injectable()
export class MenuMongoAdapter implements MenuRepository{
    constructor(
        private prismaService: PrismaService
    ){}

    update(props: any): void {
        throw new Error("Method not implemented.");
    }

    async create(props: CreateMenuProps, session?: PrismaService): Promise<MenuEntity> {
        try {
            let prisma = this.prismaService;
            if(session) prisma = session;

            const result = await prisma.menu.create({
                data: {
                    name: props.name,
                    price: props.price
                }
            })

            const entity = Builder<MenuEntity>(MenuEntity, {
                ...result,
            }).build();

            return entity;

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async findById(id: string, session?: PrismaService): Promise<MenuEntity> {
        let prisma = this.prismaService;
        if (session) prisma = session;
      
        const result = await prisma.menu.findUnique({
          where: {
            id: id,
          },
        });

        if (!result) {
            throw new Error("Menu not found");
          }
      
        const entity = Builder<MenuEntity>(MenuEntity, {
          ...result,
        }).build();
      
        return entity;
      }

}