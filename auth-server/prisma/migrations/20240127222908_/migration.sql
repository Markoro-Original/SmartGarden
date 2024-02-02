-- CreateTable
CREATE TABLE "Simulation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isRunning" BOOLEAN NOT NULL,
    "data" TEXT NOT NULL,
    "gardenId" INTEGER NOT NULL,
    CONSTRAINT "Simulation_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
