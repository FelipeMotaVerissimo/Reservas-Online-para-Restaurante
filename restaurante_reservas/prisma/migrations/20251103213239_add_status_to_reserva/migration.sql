-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "pessoas" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Reserva" ("criadoEm", "data", "email", "id", "nome", "pessoas", "telefone") SELECT "criadoEm", "data", "email", "id", "nome", "pessoas", "telefone" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
