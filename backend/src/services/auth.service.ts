import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { UserRepository } from "../repositories/user.repo";
import type { SignOptions } from "jsonwebtoken";

const userRepo = new UserRepository();

export class AuthService {
    async register(email: string, password: string, name?: string) {
        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) {
        throw new AppError("Email already in use", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepo.create({
        email,
        password: hashedPassword,
        name,
        });

        return user;
    }

    async login(email: string, password: string) {
        const user = await userRepo.findByEmail(email);
        if (!user) {
        throw new AppError("Invalid credentials", 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
        }

        if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
            throw new Error("JWT env variables are missing");
        }

        const expiresIn = process.env.JWT_EXPIRES_IN;

        if (!expiresIn) {
            throw new Error("JWT_EXPIRES_IN is missing");
        }

        const signOptions: SignOptions = {
            expiresIn: isNaN(Number(expiresIn))
                ? expiresIn as SignOptions["expiresIn"]
                : Number(expiresIn),
        };
        
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            signOptions
        );

        return { user, token };
    }

    async getUserById(userId: string) {
        const user = await userRepo.findById(userId);
        if (!user) {
        throw new AppError("User not found", 404);
        }
        return user;
    }
}
