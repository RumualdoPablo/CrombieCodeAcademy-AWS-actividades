-- AlterTable
ALTER TABLE `user` ADD COLUMN `rol` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
