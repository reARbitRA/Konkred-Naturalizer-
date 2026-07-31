import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "alive",
    version: "6.2.0",
    service: "ARBITRA_QA_CORE",
    timestamp: new Date().toISOString(),
  });
}
