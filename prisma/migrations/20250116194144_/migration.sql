-- CreateTable
CREATE TABLE "PricesServicesWheel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "measure" TEXT NOT NULL,
    "repair" REAL NOT NULL,
    "change" REAL NOT NULL,
    "rotation" REAL NOT NULL,
    "disassembly" REAL NOT NULL,
    "assembly" REAL NOT NULL,
    "vulcanization" REAL NOT NULL,
    "fineValve" REAL NOT NULL,
    "thickValve" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RubberGutsRepair" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "vulcanizationN" REAL NOT NULL,
    "vulcanizationG" REAL NOT NULL,
    "vulcanizationValve" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentsRepairs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "services" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "clientName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
