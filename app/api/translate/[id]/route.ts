import { updateCounter } from "@/services/translateService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { success } = await request.json();
  const id = Number(params.id);
  const updatedWord = await updateCounter(id, success);

  if (!updatedWord)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(updatedWord);
}
