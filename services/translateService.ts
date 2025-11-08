import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTranslate(word: string, translation: string) {
  return prisma.translate.create({
    data: {
      word,
      translation,
      counter: 0,
      isMemorized: false,
    },
  });
}
