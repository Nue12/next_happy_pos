/*
  Warnings:

  - A unique constraint covering the columns `[menu_id,menu_category_id,location_id]` on the table `menus_menu_categories_locations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tables" ADD COLUMN     "asset_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "menus_menu_categories_locations_menu_id_menu_category_id_lo_key" ON "menus_menu_categories_locations"("menu_id", "menu_category_id", "location_id");
