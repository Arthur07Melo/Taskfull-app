/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `days` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `days` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "days_date_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "days_userId_key" ON "days"("userId");
