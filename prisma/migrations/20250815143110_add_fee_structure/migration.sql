-- CreateTable
CREATE TABLE `FeeStructure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `academicYear` VARCHAR(191) NOT NULL,
    `numberOfTerms` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeeItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feeStructureId` INTEGER NOT NULL,
    `feeTypeId` INTEGER NOT NULL,
    `feeName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeeStructure` ADD CONSTRAINT `FeeStructure_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeeItem` ADD CONSTRAINT `FeeItem_feeStructureId_fkey` FOREIGN KEY (`feeStructureId`) REFERENCES `FeeStructure`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeeItem` ADD CONSTRAINT `FeeItem_feeTypeId_fkey` FOREIGN KEY (`feeTypeId`) REFERENCES `MasterDropdown`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
