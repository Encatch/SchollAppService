-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `genderId` INTEGER NULL,
    `qualificationId` INTEGER NULL,
    `departmentId` INTEGER NULL,
    `designationId` INTEGER NULL,
    `staffTypeId` INTEGER NULL,
    `experience` VARCHAR(191) NULL,
    `mobileNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `salary` DOUBLE NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isTransportRequired` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Staff_email_key`(`email`),
    UNIQUE INDEX `Staff_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimePeriod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `periodName` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StaffTimePeriods` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StaffTimePeriods_AB_unique`(`A`, `B`),
    INDEX `_StaffTimePeriods_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `MasterDropdown`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_qualificationId_fkey` FOREIGN KEY (`qualificationId`) REFERENCES `MasterDropdown`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `MasterDropdown`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_designationId_fkey` FOREIGN KEY (`designationId`) REFERENCES `MasterDropdown`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_staffTypeId_fkey` FOREIGN KEY (`staffTypeId`) REFERENCES `MasterDropdown`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimePeriod` ADD CONSTRAINT `TimePeriod_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StaffTimePeriods` ADD CONSTRAINT `_StaffTimePeriods_A_fkey` FOREIGN KEY (`A`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StaffTimePeriods` ADD CONSTRAINT `_StaffTimePeriods_B_fkey` FOREIGN KEY (`B`) REFERENCES `TimePeriod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
