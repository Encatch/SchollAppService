/*
  Warnings:

  - Added the required column `classId` to the `TimePeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `TimePeriod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timeperiod` ADD COLUMN `classId` INTEGER NOT NULL,
    ADD COLUMN `sectionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TimePeriod` ADD CONSTRAINT `TimePeriod_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimePeriod` ADD CONSTRAINT `TimePeriod_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
