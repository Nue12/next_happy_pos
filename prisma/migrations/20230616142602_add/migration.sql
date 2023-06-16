/*
  Warnings:

  - You are about to drop the `discount` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "addon_categories" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "addons" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "menu_categories" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tables" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "discount";
