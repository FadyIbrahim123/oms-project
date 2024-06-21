/*
  Warnings:

  - You are about to drop the column `promoCodeMultiplier` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "promoCodeMultiplier",
DROP COLUMN "totalPrice",
ALTER COLUMN "subtotal" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discountMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
