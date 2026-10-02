-- CreateTable
CREATE TABLE "Participante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventoId" INTEGER NOT NULL,
    "participanteId" INTEGER NOT NULL,
    CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inscricao_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
