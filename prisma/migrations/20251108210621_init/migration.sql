-- CreateTable
CREATE TABLE "translate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "isMemorized" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "translate_word_key" ON "translate"("word");
