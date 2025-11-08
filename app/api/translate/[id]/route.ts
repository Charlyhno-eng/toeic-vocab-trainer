import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { success } = await request.json();
  const id = Number(params.id);
  let word = await prisma.translate.findUnique({ where: { id } });
  if (!word) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let counter = word.counter;
  if (success) counter = Math.min(counter + 1, 10);
  else counter = Math.max(counter - 1, 0);
  const isMemorized = counter === 10;

  word = await prisma.translate.update({
    where: { id },
    data: { counter, isMemorized },
  });
  return NextResponse.json(word);
}
