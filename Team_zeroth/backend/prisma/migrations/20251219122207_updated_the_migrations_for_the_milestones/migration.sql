/*
  Warnings:

  - You are about to drop the `CampaignMedia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `media` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CampaignMedia` DROP FOREIGN KEY `CampaignMedia_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `CampaignMedia` DROP FOREIGN KEY `CampaignMedia_userId_fkey`;

-- AlterTable
ALTER TABLE `Campaign` ADD COLUMN `media` JSON NOT NULL;

-- AlterTable
ALTER TABLE `CampaignMilestone` ADD COLUMN `raisedAmount` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `target` BIGINT NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `CampaignMedia`;

-- CreateTable
CREATE TABLE `MileStoneReport` (
    `id` VARCHAR(191) NOT NULL,
    `milestoneId` VARCHAR(191) NOT NULL,
    `reportDescription` VARCHAR(191) NOT NULL,
    `reportUrl` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
