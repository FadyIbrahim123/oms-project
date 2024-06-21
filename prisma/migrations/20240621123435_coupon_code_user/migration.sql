-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discountMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "CouponCodes" (
    "code" TEXT NOT NULL,
    "discountMultiplier" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CouponCodes_code_key" ON "CouponCodes"("code");
