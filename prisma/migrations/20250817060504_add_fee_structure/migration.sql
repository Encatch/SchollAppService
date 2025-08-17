/*
  Warnings:

  - You are about to drop the `markssheet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `markssheet` DROP FOREIGN KEY `MarksSheet_classId_fkey`;

-- DropForeignKey
ALTER TABLE `markssheet` DROP FOREIGN KEY `MarksSheet_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `markssheet` DROP FOREIGN KEY `MarksSheet_subjectId_fkey`;

-- DropTable
DROP TABLE `markssheet`;

-- CreateTable
CREATE TABLE `MarksSheetMaster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `sectionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MarksSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marksheetId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `maxMarks` INTEGER NOT NULL,
    `passMarks` INTEGER NOT NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MarksSheetMaster` ADD CONSTRAINT `MarksSheetMaster_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarksSheetMaster` ADD CONSTRAINT `MarksSheetMaster_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarksSubject` ADD CONSTRAINT `MarksSubject_marksheetId_fkey` FOREIGN KEY (`marksheetId`) REFERENCES `MarksSheetMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarksSubject` ADD CONSTRAINT `MarksSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
