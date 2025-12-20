-- AlterTable
ALTER TABLE `Campaign` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `CampaignMilestone` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `MileStoneReport` MODIFY `reportDescription` LONGTEXT NOT NULL;
