/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Player.name_unique" ON "Player"("name");
