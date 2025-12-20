/*
  Warnings:

  - A unique constraint covering the columns `[khaltiPidx]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Donation` ADD COLUMN `khaltiPidx` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Donation_khaltiPidx_key` ON `Donation`(`khaltiPidx`);
