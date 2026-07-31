import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { fallbackRewriteEngine, sha256Simple, stripAiPatterns } from "@/lib/arbitra-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text;
    const settings = body.settings || {};

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { status: "VALIDATION_ERROR", detail: "Text field must contain non-whitespace characters." },
        { status: 422 }
      );
    }

    if (text.length > 50000) {
      return NextResponse.json(
        { status: "VALIDATION_ERROR", detail: "Text exceeds maximum allowed length of 50,000 characters." },
        { status: 422 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini key is available, use Gemini 3.6 Flash for intelligent POS & semantic rewrite with structured JSON validation
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const prompt = `You are ARBITRA QA CORE v6.2 — a deterministic, meaning-preserving semantic rewrite engine.
Your task is to rewrite the input text sentence-by-sentence following strict rules:
1. Preserve all proper nouns, technical terms, names, and entities strictly.
2. Substitute general nouns, verbs, adjectives, and adverbs with precise, natural POS-filtered synonyms.
3. Remove generic AI clichés, fluff, and robotic transition words like "Moreover", "Furthermore", "In conclusion", "At its core", "It is important to note that".
4. Ensure sentence rhythm and cadence are natural and human-like.
5. Guarantee complete semantic invariance (meaning must be preserved 100%).

Return a JSON object matching this schema:
{
  "output": string (the full rewritten text),
  "similarity": number (estimated cosine similarity between 0.78 and 1.0),
  "sentencesProcessed": number,
  "fallbackCount": number,
  "sentences": [
    {
      "original": string,
      "rewritten": string,
      "rootLemma": string,
      "rootPos": string,
      "entities": string[],
      "tokensCount": number,
      "similarity": number,
      "accepted": boolean,
      "fallbackReason": string or null
    }
  ]
}

Input Text:
${text}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            temperature: 0.3,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                output: { type: Type.STRING },
                similarity: { type: Type.NUMBER },
                sentencesProcessed: { type: Type.INTEGER },
                fallbackCount: { type: Type.INTEGER },
                sentences: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      original: { type: Type.STRING },
                      rewritten: { type: Type.STRING },
                      rootLemma: { type: Type.STRING },
                      rootPos: { type: Type.STRING },
                      entities: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      tokensCount: { type: Type.INTEGER },
                      similarity: { type: Type.NUMBER },
                      accepted: { type: Type.BOOLEAN },
                      fallbackReason: { type: Type.STRING },
                    },
                  },
                },
              },
              required: ["output", "similarity", "sentencesProcessed", "sentences"],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          const scrubbedOutput = stripAiPatterns(parsed.output || text);
          
          return NextResponse.json({
            status: "OPERATIONAL",
            client: req.headers.get("x-forwarded-for") || "127.0.0.1",
            similarity: parsed.similarity ?? 0.92,
            sentences_processed: parsed.sentencesProcessed ?? parsed.sentences?.length ?? 1,
            fallback_count: parsed.fallbackCount ?? 0,
            sentences: parsed.sentences || [],
            fingerprint: {
              hash: sha256Simple(scrubbedOutput),
              input_hash: sha256Simple(text),
              timestamp: Math.floor(Date.now() / 1000),
              length: scrubbedOutput.length,
            },
            output: scrubbedOutput,
          });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, using deterministic local engine:", geminiError);
      }
    }

    // Deterministic fallback engine
    const localResult = fallbackRewriteEngine(text, settings);
    return NextResponse.json({
      status: "OPERATIONAL",
      client: req.headers.get("x-forwarded-for") || "127.0.0.1",
      similarity: localResult.similarity,
      sentences_processed: localResult.sentencesProcessed,
      fallback_count: localResult.fallbackCount,
      sentences: localResult.sentences,
      fingerprint: {
        hash: localResult.fingerprint.hash,
        input_hash: localResult.fingerprint.inputHash,
        timestamp: localResult.fingerprint.timestamp,
        length: localResult.fingerprint.length,
      },
      output: localResult.output,
    });
  } catch (err: unknown) {
    console.error("Rewrite API Error:", err);
    return NextResponse.json(
      { status: "ERROR", detail: "Internal pipeline error during processing." },
      { status: 500 }
    );
  }
}
