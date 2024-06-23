import DB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  await DB();
  return NextResponse.json({ user: "ASDASDA" }, { status: 200 });
}
