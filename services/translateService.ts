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

export async function updateCounter(id: number, success: boolean) {
  const word = await prisma.translate.findUnique({ where: { id } });
  if (!word) return null;

  let counter = word.counter;
  if (success) counter = Math.min(counter + 1, 10);
  else counter = Math.max(counter - 1, 0);

  const isMemorized = counter === 10;

  return prisma.translate.update({
    where: { id },
    data: { counter, isMemorized },
  });
}
