import { BaseRepository } from "./base.repo";

export class ProductRepository extends BaseRepository {
    async findMany({
        skip,
        take,
    }: {
        skip: number;
        take: number;
    }) {
        return this.prisma.product.findMany({
        where: { isActive: true },
        skip,
        take,
        orderBy: { createdAt: "desc" },
        });
    }

    async countActive() {
        return this.prisma.product.count({
        where: { isActive: true },
        });
    }

    async findById(id: string) {
        return this.prisma.product.findFirst({
        where: { id, isActive: true },
        });
    }
}
