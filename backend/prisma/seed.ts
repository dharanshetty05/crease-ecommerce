import prisma from "../src/utils/prisma";

async function main() {
    await prisma.product.createMany({
        data: [
            {
                name: "Classic Cricket Tee",
                description: "Minimal cricket-inspired t-shirt",
                price: 1299,
                imageUrl: "https://example.com/t1.png",
            },
            {
                name: "Crease Hoodie",
                description: "Premium hoodie for cricket fans",
                price: 2499,
                imageUrl: "https://example.com/h1.png",
            },
        ],
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
