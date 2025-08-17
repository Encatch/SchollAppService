/*
  Warnings:

  - You are about to drop the column `subject` on the `timeperiod` table. All the data in the column will be lost.
  - You are about to drop the `_stafftimeperiods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectId` to the `TimePeriod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_stafftimeperiods` DROP FOREIGN KEY `_StaffTimePeriods_A_fkey`;

-- DropForeignKey
ALTER TABLE `_stafftimeperiods` DROP FOREIGN KEY `_StaffTimePeriods_B_fkey`;

-- AlterTable
ALTER TABLE `timeperiod` DROP COLUMN `subject`,
    ADD COLUMN `subjectId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_stafftimeperiods`;

-- CreateTable
CREATE TABLE `Exams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examName` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TimePeriod` ADD CONSTRAINT `TimePeriod_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
