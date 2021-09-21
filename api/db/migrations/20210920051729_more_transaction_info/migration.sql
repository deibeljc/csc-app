/*
  Warnings:

  - Added the required column `playerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fromTeamApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD COLUMN     "toTeamApproved" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
