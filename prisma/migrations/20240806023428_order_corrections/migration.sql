-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "value" REAL NOT NULL,
    "client" TEXT NOT NULL,
    "description" TEXT,
    "date" TEXT NOT NULL,
    "timeStart" BIGINT NOT NULL,
    "timeConcluded" BIGINT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("client", "date", "description", "id", "timeConcluded", "timeStart", "userId", "value") SELECT "client", "date", "description", "id", "timeConcluded", "timeStart", "userId", "value" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
