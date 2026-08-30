-- CreateEnum
CREATE TYPE "ProductImageView" AS ENUM ('FRONT', 'BACK');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "badge" TEXT,
ADD COLUMN     "brandPlacement" JSONB,
ADD COLUMN     "createdRank" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "designConcept" TEXT,
ADD COLUMN     "designKey" TEXT,
ADD COLUMN     "designTechnique" TEXT,
ADD COLUMN     "style" TEXT;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "color" TEXT,
ADD COLUMN     "view" "ProductImageView" NOT NULL DEFAULT 'FRONT';
