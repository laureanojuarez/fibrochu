import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/productos";
  const secret = searchParams.get("secret");

  // Verificar que la solicitud sea legítima
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
