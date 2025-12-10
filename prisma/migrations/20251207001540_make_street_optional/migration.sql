-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Iraq',
    "landmark" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "country", "createdAt", "id", "label", "landmark", "notes", "state", "street", "userId", "zip") SELECT "city", "country", "createdAt", "id", "label", "landmark", "notes", "state", "street", "userId", "zip" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
