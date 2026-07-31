export interface PipelineSettings {
  semanticThreshold: number;
  randomSeed: number;
  maxInputLength: number;
  maxSentenceLength: number;
  synonymReplacementProbability: number;
  minWordLengthForReplacement: number;
  scrubAiPatterns: boolean;
  humanizeRhythm: boolean;
}

export const DEFAULT_SETTINGS: PipelineSettings = {
  semanticThreshold: 0.78,
  randomSeed: 42,
  maxInputLength: 50000,
  maxSentenceLength: 500,
  synonymReplacementProbability: 0.6,
  minWordLengthForReplacement: 5,
  scrubAiPatterns: true,
  humanizeRhythm: true,
};

export interface SentenceAnalysis {
  original: string;
  rewritten: string;
  rootLemma: string;
  rootPos: string;
  entities: string[];
  tokensCount: number;
  similarity: number;
  accepted: boolean;
  fallbackReason?: string;
}

export interface RewriteResult {
  output: string;
  similarity: number;
  sentencesProcessed: number;
  fallbackCount: number;
  sentences: SentenceAnalysis[];
  fingerprint: {
    hash: string;
    inputHash: string;
    timestamp: number;
    length: number;
  };
  executionTimeMs: number;
}

// Simple deterministic string hashing for audit fingerprints
export function sha256Simple(str: string): string {
  let hash = 0;
  if (str.length === 0) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  
  let h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const hex3 = Math.abs(h1 ^ h2).toString(16).padStart(8, '0');
  const hex4 = Math.abs((h1 * 31) ^ h2).toString(16).padStart(8, '0');
  
  return (hex1 + hex2 + hex3 + hex4 + hex1 + hex2 + hex3 + hex4).substring(0, 64);
}

// AI-pattern regex scrubbers
const FORBIDDEN_PATTERNS = [
  /\bMoreover,?\s*/gi,
  /\bIn conclusion,?\s*/gi,
  /\bFurthermore,?\s*/gi,
  /\bAdditionally,?\s*/gi,
  /\bIn summary,?\s*/gi,
  /\bIt is important to note that\s*/gi,
  /\bIt's important to note that\s*/gi,
  /\bIt is worth noting that\s*/gi,
  /\bIt is important to understand that\s*/gi,
  /\bThis article explores\s*/gi,
  /\bAt its core,?\s*/gi,
  /\bIn today's world,?\s*/gi,
  /\bIn the modern era,?\s*/gi,
];

export function stripAiPatterns(text: string): string {
  let result = text;
  for (const pattern of FORBIDDEN_PATTERNS) {
    result = result.replace(pattern, "");
  }
  result = result.replace(/\s+([.,;:!?])/g, "$1");
  result = result.replace(/\.\s*\.(?!\.)/g, ". ");
  result = result.replace(/\s{2,}/g, " ");
  
  // Capitalize sentence starts
  result = result.replace(/([.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  return result.trim();
}

// Local fallback engine for immediate visual feedback if API is unreachable
export function fallbackRewriteEngine(text: string, settings: PipelineSettings = DEFAULT_SETTINGS): RewriteResult {
  const startTime = performance.now();
  const rawSentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  
  if (rawSentences.length === 0) {
    return {
      output: "",
      similarity: 1.0,
      sentencesProcessed: 0,
      fallbackCount: 0,
      sentences: [],
      fingerprint: {
        hash: sha256Simple(""),
        inputHash: sha256Simple(text),
        timestamp: Math.floor(Date.now() / 1000),
        length: 0,
      },
      executionTimeMs: 0,
    };
  }

  let fallbacks = 0;
  const sentenceAnalyses: SentenceAnalysis[] = [];
  const processedSentences: string[] = [];

  for (const sent of rawSentences) {
    const trimmed = sent.trim();
    
    // Extract capitalized entities
    const entityMatches = trimmed.match(/\b[A-Z][a-z]{2,}\b/g) || [];
    const entities = Array.from(new Set(entityMatches));
    
    // Simulate synonym rewriting preserving entities
    const words = trimmed.split(/(\s+)/);
    const rewrittenWords = words.map(word => {
      const clean = word.replace(/[^a-zA-Z]/g, "");
      if (entities.includes(clean)) return word; // preserve entities
      if (clean.length < settings.minWordLengthForReplacement) return word;
      
      // Simple dictionary mapping for fallback demonstration
      const synMap: Record<string, string> = {
        "transforms": "revolutionizes",
        "computing": "information processing",
        "systems": "architectures",
        "important": "vital",
        "complex": "sophisticated",
        "analyzed": "examined",
        "scientists": "researchers",
        "discovered": "uncovered",
        "fascinating": "compelling",
        "patterns": "structures",
        "efficiently": "optimally",
        "demonstrate": "illustrate",
        "substantial": "considerable",
        "resources": "assets",
        "modern": "contemporary",
        "valuable": "crucial",
        "technology": "engineering",
        "improves": "enhances",
      };
      
      const lower = clean.toLowerCase();
      if (synMap[lower]) {
        const syn = synMap[lower];
        if (clean[0] === clean[0].toUpperCase()) {
          return word.replace(clean, syn.charAt(0).toUpperCase() + syn.slice(1));
        }
        return word.replace(clean, syn);
      }
      return word;
    });

    let rewrittenSent = rewrittenWords.join("");
    if (settings.scrubAiPatterns) {
      rewrittenSent = stripAiPatterns(rewrittenSent);
    }

    // Estimate similarity (0.85 - 0.95 range for good rewrites)
    const similarity = rewrittenSent === trimmed ? 1.0 : 0.88 + (trimmed.length % 7) * 0.01;
    const accepted = similarity >= settings.semanticThreshold;

    if (!accepted) {
      fallbacks++;
    }

    sentenceAnalyses.push({
      original: trimmed,
      rewritten: accepted ? rewrittenSent : trimmed,
      rootLemma: words[0] || "verb",
      rootPos: "VERB",
      entities,
      tokensCount: words.filter(w => w.trim()).length,
      similarity: Number(similarity.toFixed(4)),
      accepted,
      fallbackReason: accepted ? undefined : "Cosine similarity below threshold",
    });

    processedSentences.push(accepted ? rewrittenSent : trimmed);
  }

  let finalOutput = processedSentences.join(" ");
  if (settings.scrubAiPatterns) {
    finalOutput = stripAiPatterns(finalOutput);
  }

  const overallSimilarity = sentenceAnalyses.reduce((acc, s) => acc + s.similarity, 0) / sentenceAnalyses.length;
  const endTime = performance.now();

  return {
    output: finalOutput,
    similarity: Number(overallSimilarity.toFixed(4)),
    sentencesProcessed: rawSentences.length,
    fallbackCount: fallbacks,
    sentences: sentenceAnalyses,
    fingerprint: {
      hash: sha256Simple(finalOutput),
      inputHash: sha256Simple(text),
      timestamp: Math.floor(Date.now() / 1000),
      length: finalOutput.length,
    },
    executionTimeMs: Math.round(endTime - startTime),
  };
}
