/*
  Warnings:

  - Added the required column `number` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "number" INTEGER NOT NULL,
ALTER COLUMN "matchStatsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "tier" SET DEFAULT E'UNASSIGNED';

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "tier" SET DEFAULT E'UNASSIGNED';

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "effectiveFlashes" INTEGER NOT NULL,
    "ADR" DOUBLE PRECISION NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchStatsId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD FOREIGN KEY ("matchStatsId") REFERENCES "MatchStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
