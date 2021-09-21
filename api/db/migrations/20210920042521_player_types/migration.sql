/*
  Warnings:

  - You are about to drop the column `freeAgent` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matchStatsId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchStatsId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlayerType" AS ENUM ('FREE_AGENT', 'PERM_FREE_AGENT', 'PERM_FREE_AGENT_SIGNED', 'SIGNED', 'BANNED');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "matchStatsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "freeAgent",
ADD COLUMN     "type" "PlayerType" NOT NULL DEFAULT E'FREE_AGENT';

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "fromTeamId" TEXT,
    "toTeamId" TEXT,
    "playerTypeBefore" "PlayerType" NOT NULL,
    "playerTypeAfter" "PlayerType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchStats" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_matchStatsId_unique" ON "Match"("matchStatsId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("fromTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("toTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("matchStatsId") REFERENCES "MatchStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
