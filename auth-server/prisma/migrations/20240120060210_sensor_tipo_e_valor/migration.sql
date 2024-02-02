/*
  Warnings:

  - Added the required column `type` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Sensor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sensor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "espId" INTEGER NOT NULL,
    CONSTRAINT "Sensor_espId_fkey" FOREIGN KEY ("espId") REFERENCES "Esp" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sensor" ("espId", "id", "name") SELECT "espId", "id", "name" FROM "Sensor";
DROP TABLE "Sensor";
ALTER TABLE "new_Sensor" RENAME TO "Sensor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
