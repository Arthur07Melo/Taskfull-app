-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "days_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_days" ("date", "id", "userId") SELECT "date", "id", "userId" FROM "days";
DROP TABLE "days";
ALTER TABLE "new_days" RENAME TO "days";
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");
CREATE TABLE "new_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits" ("created_at", "description", "id", "title", "userId") SELECT "created_at", "description", "id", "title", "userId" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
