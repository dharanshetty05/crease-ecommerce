import { BaseRepository } from "./base.repo";

export class UserRepository extends BaseRepository {
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(data: { email: string; password: string; name?: string }) {
        return this.prisma.user.create({ data });
    }
}
