import { updateCounter } from "@/services/translateService";
import { NextResponse } from "next/server";

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const { success } = await request.json();
    const updatedWord = await updateCounter(Number(id), success);
    if (!updatedWord) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updatedWord);
  } catch (err) {
    console.error("API PATCH error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
