/*
  Warnings:

  - A unique constraint covering the columns `[playerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "playerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_playerId_unique" ON "User"("playerId");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
