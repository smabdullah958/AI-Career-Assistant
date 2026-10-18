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

const Analyzer = async (PDFText, Role, Experience) => {
  try {
    const prompt = ChatPromptTemplate.fromTemplate(AnalyzerPrompt);
    const chain = prompt.pipe(LLM);

    const response = await chain.invoke({
      PDFText,
      Role,
      Experience,
    });

    const finishReason = response.response_metadata?.finish_reason;
    let raw = extractResponseText(response.content).trim();

    // Log response diagnostics without printing the candidate's resume.
    console.log("Resume Analyzer response diagnostics:", {
      responseLength: raw.length,
      finishReason,
      usage: response.usage_metadata,
    });

    if (!raw) {
      throw new Error(
        "Groq returned an empty response. Check the model response and API configuration.",
      );
    }

    // Detect responses that may have been truncated by the token limit.
    if (finishReason === "length") {
      throw new Error(
        "Groq reached its output-token limit. Increase the allowed output tokens or shorten the prompt/response.",
      );
    }

    // Remove optional Markdown JSON fences.
    raw = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      console.error("Resume Analyzer returned invalid JSON:", {
        parseError: parseError.message,
        responseLength: raw.length,
        finishReason,
        responseStart: raw.slice(0, 150),
        responseEnd: raw.slice(-250),
      });

      throw new Error(
        "The AI returned incomplete or invalid JSON. Check the response diagnostics and Groq output-token limit.",
      );
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
