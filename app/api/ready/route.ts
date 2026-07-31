import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ready",
    version: "6.2.0",
    models: {
      spacy: "en_core_web_sm",
      sbert: "sentence-transformers/all-mpnet-base-v2",
      wordnet: "omw-1.4",
      gemini: "gemini-3.6-flash",
    },
    rateLimiter: "active (120 req/min)",
    timestamp: new Date().toISOString(),
  });
}
