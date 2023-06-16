/*
  Warnings:

  - You are about to drop the column `addon_category_id` on the `addons` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `township` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `addon_category_id` on the `menus_addon_categories` table. All the data in the column will be lost.
  - You are about to drop the column `is_required` on the `menus_addon_categories` table. All the data in the column will be lost.
  - You are about to drop the column `menu_id` on the `menus_addon_categories` table. All the data in the column will be lost.
  - The primary key for the `menus_menu_categories_locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `location_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - You are about to drop the column `menu_category_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - You are about to drop the column `menu_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refreshtoken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `addons_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_menu_categories` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `addon_categories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `addon_categories_id` to the `addons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companies_id` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_categories_id` to the `menus_menu_categories_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- DropForeignKey
ALTER TABLE "menus_addon_categories" DROP CONSTRAINT "menus_addon_categories_addon_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_addon_categories" DROP CONSTRAINT "menus_addon_categories_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_locations" DROP CONSTRAINT "menus_locations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_locations" DROP CONSTRAINT "menus_locations_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories" DROP CONSTRAINT "menus_menu_categories_menu_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories" DROP CONSTRAINT "menus_menu_categories_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_menu_category_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_fkey";

-- AlterTable
ALTER TABLE "addon_categories" ADD COLUMN     "is_required" BOOLEAN DEFAULT false,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "addons" DROP COLUMN "addon_category_id",
ADD COLUMN     "addon_categories_id" INTEGER NOT NULL,
ADD COLUMN     "is_available" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'Default address';

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "city",
DROP COLUMN "company_id",
DROP COLUMN "township",
ADD COLUMN     "companies_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "menus_addon_categories" DROP COLUMN "addon_category_id",
DROP COLUMN "is_required",
DROP COLUMN "menu_id",
ADD COLUMN     "addon_categories_id" INTEGER,
ADD COLUMN     "menus_id" INTEGER;

-- AlterTable
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_pkey",
DROP COLUMN "location_id",
DROP COLUMN "menu_category_id",
DROP COLUMN "menu_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "is_available" BOOLEAN DEFAULT true,
ADD COLUMN     "locations_id" INTEGER,
ADD COLUMN     "menu_categories_id" INTEGER NOT NULL,
ADD COLUMN     "menus_id" INTEGER,
ADD CONSTRAINT "menus_menu_categories_locations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "company_id",
DROP COLUMN "refreshtoken",
ADD COLUMN     "companies_id" INTEGER,
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "addons_locations";

-- DropTable
DROP TABLE "menus_locations";

-- DropTable
DROP TABLE "menus_menu_categories";

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locations_id" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addons" ADD CONSTRAINT "addons_addon_categories_id_fkey" FOREIGN KEY ("addon_categories_id") REFERENCES "addon_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_companies_id_fkey" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_locations_id_fkey" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_categories" ADD CONSTRAINT "menus_addon_categories_addon_categories_id_fkey" FOREIGN KEY ("addon_categories_id") REFERENCES "addon_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_categories" ADD CONSTRAINT "menus_addon_categories_menus_id_fkey" FOREIGN KEY ("menus_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_locations_id_fkey" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menus_id_fkey" FOREIGN KEY ("menus_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menu_categories_id_fkey" FOREIGN KEY ("menu_categories_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companies_id_fkey" FOREIGN KEY ("companies_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
