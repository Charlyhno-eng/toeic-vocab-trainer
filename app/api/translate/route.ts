import { createTranslate } from "@/services/translateService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const words = await prisma.translate.findMany({
    where: { isMemorized: false },
  });
  return NextResponse.json(words);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.word || !data.translation) {
    return NextResponse.json(
      { error: "Missing word or translation" },
      { status: 400 },
    );
  }

  try {
    const newWord = await createTranslate(data.word, data.translation);
    return NextResponse.json(newWord, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to add word" },
      { status: 500 },
    );
  }
}
