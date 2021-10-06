-- CreateEnum
CREATE TYPE "Conference" AS ENUM ('LEFT_TWIX', 'RIGHT_TWIX');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "conference" "Conference" NOT NULL DEFAULT E'LEFT_TWIX';
