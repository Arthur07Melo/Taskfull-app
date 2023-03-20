/*
  Warnings:

  - A unique constraint covering the columns `[user_id,id]` on the table `habits` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "habits_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "habits_user_id_id_key" ON "habits"("user_id", "id");
