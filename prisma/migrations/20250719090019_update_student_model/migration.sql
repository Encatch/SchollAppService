/*
  Warnings:

  - You are about to drop the column `gender` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `gender`,
    ADD COLUMN `genderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `MasterDropdown`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
