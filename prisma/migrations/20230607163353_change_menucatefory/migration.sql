/*
  Warnings:

  - You are about to drop the column `menu_categorie_id` on the `menus_menu_categories_locations` table. All the data in the column will be lost.
  - Added the required column `menu_category_id` to the `menus_menu_categories_locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_menu_categorie_id_fkey";

-- AlterTable
ALTER TABLE "menus_menu_categories_locations" DROP COLUMN "menu_categorie_id",
ADD COLUMN     "menu_category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
