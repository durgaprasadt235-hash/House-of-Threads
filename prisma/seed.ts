import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const brands = [
  {
    name: "Elphino",
    slug: "elphino",
    description: "Affordable, expressive clothing with casual, printed, and state-themed collections.",
  },
  {
    name: "The Walker Company",
    slug: "the-walker-company",
    description: "Premium, clean clothing for professional and business-casual wardrobes.",
  },
];

async function main() {
  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error("Brand seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
