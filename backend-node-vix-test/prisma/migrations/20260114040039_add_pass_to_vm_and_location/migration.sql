/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pass` to the `vM` table without a default value. This is not possible if the table is not empty.
  - Made the column `hasBackup` on table `vM` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vM` ADD COLUMN `location` ENUM('LOCAL', 'REMOTE') NOT NULL DEFAULT 'LOCAL',
    ADD COLUMN `pass` VARCHAR(191) NOT NULL,
    MODIFY `hasBackup` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
