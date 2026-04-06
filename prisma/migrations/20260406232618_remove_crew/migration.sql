/*
  Warnings:

  - You are about to drop the column `birthYear` on the `JumpRequest` table. All the data in the column will be lost.
  - Added the required column `travelerBirthYear` to the `JumpRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JumpRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mission" TEXT NOT NULL,
    "destinationYear" INTEGER NOT NULL,
    "plutoniumCores" INTEGER NOT NULL,
    "suppressParadoxCheck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "travelerName" TEXT NOT NULL,
    "travelerBirthYear" INTEGER NOT NULL
);
INSERT INTO "new_JumpRequest" ("createdAt", "destinationYear", "id", "mission", "plutoniumCores", "suppressParadoxCheck", "travelerName") SELECT "createdAt", "destinationYear", "id", "mission", "plutoniumCores", "suppressParadoxCheck", "travelerName" FROM "JumpRequest";
DROP TABLE "JumpRequest";
ALTER TABLE "new_JumpRequest" RENAME TO "JumpRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
