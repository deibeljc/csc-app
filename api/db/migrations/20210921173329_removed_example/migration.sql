/*
  Warnings:

  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Programmer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Programmer" DROP CONSTRAINT "Programmer_personId_fkey";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Programmer";
