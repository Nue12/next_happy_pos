-- CreateTable
CREATE TABLE "addon_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "addon_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "addon_category_id" INTEGER NOT NULL,

    CONSTRAINT "addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addons_locations" (
    "id" SERIAL NOT NULL,
    "addon_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "is_availiable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addons_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "township" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "asset_url" TEXT,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_addon_categories" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "addon_category_id" INTEGER NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "menus_addon_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_locations" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "is_availiable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "menus_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_menu_categories" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "menu_category_id" INTEGER NOT NULL,

    CONSTRAINT "menus_menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshtoken" TEXT,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_menu_categories_locations" (
    "menu_id" SERIAL NOT NULL,
    "menu_category_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "menus_menu_categories_locations_pkey" PRIMARY KEY ("menu_id")
);

-- AddForeignKey
ALTER TABLE "menus_addon_categories" ADD CONSTRAINT "menus_addon_categories_addon_category_id_fkey" FOREIGN KEY ("addon_category_id") REFERENCES "addon_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_categories" ADD CONSTRAINT "menus_addon_categories_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_locations" ADD CONSTRAINT "menus_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_locations" ADD CONSTRAINT "menus_locations_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories" ADD CONSTRAINT "menus_menu_categories_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories" ADD CONSTRAINT "menus_menu_categories_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
