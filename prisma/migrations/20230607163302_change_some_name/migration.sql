/*
  Warnings:

  - You are about to drop the column `addon_categories_id` on the `addons` table. All the data in the column will be lost.
  - You are about to drop the column `companies_id` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `addon_categories_id` on the `menus_addon_categories` table. All the data in the column will be lost.
  - You are about to drop the column `menus_id` on the `menus_addon_categories` table. All the data in the column will be lost.
  - You are about to drop the column `locations_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - You are about to drop the column `menu_categories_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - You are about to drop the column `menus_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - You are about to drop the column `locations_id` on the `tables` table. All the data in the column will be lost.
  - You are about to drop the column `companies_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `addon_category_id` to the `addons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_categorie_id` to the `menus_menu_categories_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addons" DROP CONSTRAINT "addons_addon_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_companies_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_addon_categories" DROP CONSTRAINT "menus_addon_categories_addon_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_addon_categories" DROP CONSTRAINT "menus_addon_categories_menus_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_locations_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_menu_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_menus_id_fkey";

-- DropForeignKey
ALTER TABLE "tables" DROP CONSTRAINT "tables_locations_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_companies_id_fkey";

-- AlterTable
ALTER TABLE "addons" DROP COLUMN "addon_categories_id",
ADD COLUMN     "addon_category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "companies_id",
ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "menus_addon_categories" DROP COLUMN "addon_categories_id",
DROP COLUMN "menus_id",
ADD COLUMN     "addon_category_id" INTEGER,
ADD COLUMN     "menu_id" INTEGER;

-- AlterTable
ALTER TABLE "menus_menu_categories_locations" DROP COLUMN "locations_id",
DROP COLUMN "menu_categories_id",
DROP COLUMN "menus_id",
ADD COLUMN     "location_id" INTEGER,
ADD COLUMN     "menu_categorie_id" INTEGER NOT NULL,
ADD COLUMN     "menu_id" INTEGER;

-- AlterTable
ALTER TABLE "tables" DROP COLUMN "locations_id",
ADD COLUMN     "location_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "companies_id",
ADD COLUMN     "company_id" INTEGER;

-- AddForeignKey
ALTER TABLE "addons" ADD CONSTRAINT "addons_addon_category_id_fkey" FOREIGN KEY ("addon_category_id") REFERENCES "addon_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_categories" ADD CONSTRAINT "menus_addon_categories_addon_category_id_fkey" FOREIGN KEY ("addon_category_id") REFERENCES "addon_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_categories" ADD CONSTRAINT "menus_addon_categories_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menu_categorie_id_fkey" FOREIGN KEY ("menu_categorie_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
