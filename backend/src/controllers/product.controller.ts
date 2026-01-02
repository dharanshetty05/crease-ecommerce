import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ProductService } from "../services/product.service";
import {
    listProductsSchema,
    productIdSchema,
} from "../validators/product.schema";

const productService = new ProductService();

export const listProducts = asyncHandler(
    async (req: Request, res: Response) => {
        const { page, limit } = listProductsSchema.parse(req.query);
        const result = await productService.listProducts(page, limit);
        res.json(result);
    }
);

export const getProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = productIdSchema.parse(req.params);
        const product = await productService.getProductById(id);
        res.json(product);
    }
);
