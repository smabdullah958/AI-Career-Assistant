const LLM = require("../../Config/GroqConfigure");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const AnalyzerPrompt = require("../../Prompts/AnalyzerPrompt");

const WEIGHTS = {
  skillsRelevance: 30,
  projectsPracticalApplication: 25,
  workExperience: 20,
  educationCertifications: 10,
  achievementsImpact: 10,
  resumeClarity: 5,
};

function calculateRoleReadinessScore(categoryScores) {
  let total = 0;

  for (const [category, weight] of Object.entries(WEIGHTS)) {
    const score = categoryScores?.[category]?.score;

    if (
      typeof score !== "number" ||
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new Error(`Invalid or missing category score: ${category}`);
    }

    total += (score / 100) * weight;
  }

  return Number(total.toFixed(1));
}

function extractResponseText(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (typeof part?.text === "string") return part.text;
        return "";
      })
      .join("");
  }

  return "";
}

const Analyzer = async (PDFText, Role, Experience, onChunk) => {
  try {
    const prompt = ChatPromptTemplate.fromTemplate(AnalyzerPrompt);
    const chain = prompt.pipe(LLM);

    let raw = "";
    let finishReason;

    const stream = await chain.stream({
      PDFText,
      Role,
      Experience,
    });

    for await (const chunk of stream) {
      const text = extractResponseText(chunk.content);

      if (text) {
        raw += text;
        onChunk?.(text);
      }

      finishReason = chunk.response_metadata?.finish_reason || finishReason;
    }

    console.log("Resume Analyzer stream diagnostics:", {
      responseLength: raw.length,
      finishReason,
    });

    if (!raw.trim()) {
      throw new Error("The AI returned an empty response.");
    }

    if (finishReason === "length") {
      throw new Error(
        "The AI response was truncated. Increase the output-token limit or shorten the prompt.",
      );
    }

    raw = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error("Invalid streamed JSON:", {
        message: error.message,
        responseLength: raw.length,
      });

      throw new Error("The AI returned incomplete or invalid JSON.");
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("The AI response must be a JSON object.");
    }

    const roleReadinessScore = calculateRoleReadinessScore(
      parsed.categoryScores,
    );

    return {
      ...parsed,
      roleReadinessScore,
    };
  } catch (error) {
    console.error("Resume Analyzer Error:", error.message);
    throw error;
  }
};

module.exports = Analyzer;
