import { AppError } from "../utils/AppError";
import { ProductRepository } from "../repositories/product.repo";

const productRepo = new ProductRepository();

export class ProductService {
    async listProducts(page: number, limit: number) {
        const safeLimit = Math.min(limit, 20);
        const skip = (page - 1) * safeLimit;

        const [items, total] = await Promise.all([
        productRepo.findMany({ skip, take: safeLimit }),
        productRepo.countActive(),
        ]);

        return {
        items,
        pagination: {
            page,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        },
        };
    }

    async getProductById(id: string) {
        const product = await productRepo.findById(id);
        if (!product) {
        throw new AppError("Product not found", 404);
        }
        return product;
    }
}
