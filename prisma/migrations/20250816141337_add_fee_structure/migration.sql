/*
  Warnings:

  - You are about to drop the column `isActive` on the `feeitem` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `feeitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `feeitem` DROP COLUMN `isActive`,
    DROP COLUMN `totalAmount`;

-- AlterTable
ALTER TABLE `feestructure` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL DEFAULT 0;
