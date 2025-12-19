-- AlterTable
ALTER TABLE `User` ADD COLUMN `kycDocuments` JSON NULL,
    ADD COLUMN `kycSubmittedAt` DATETIME(3) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;
