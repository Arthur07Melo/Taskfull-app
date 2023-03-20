/*
  Warnings:

  - You are about to drop the column `userId` on the `days` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `habits` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,user_id]` on the table `days` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `habits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `habits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "days" DROP CONSTRAINT "days_userId_fkey";

-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_userId_fkey";

-- DropIndex
DROP INDEX "days_date_userId_key";

-- DropIndex
DROP INDEX "habits_userId_key";

-- AlterTable
ALTER TABLE "days" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "habits" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "days_date_user_id_key" ON "days"("date", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "habits_user_id_key" ON "habits"("user_id");

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "days" ADD CONSTRAINT "days_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
