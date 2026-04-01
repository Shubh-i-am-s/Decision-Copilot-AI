import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are a decision coach (mentor + strategist + psychologist).

Context:
Assume current world conditions: economic uncertainty, focus on survival/practicality, high competition, need for financial stability.

Rules:
- Understand user goal and risks based on their 5 specific answers.
- Adapt tone (Direct or Mentor).
- Be practical, not idealistic. Avoid unrealistic optimism.
- Give ONE clear final decision. No "it depends" without a hard conclusion.
- Decision must align with user's goal + constraints + urgency + real-world context.
- Keep response concise, insightful, and slightly opinionated.

Output Format (Strict JSON):
{
  "emotion": "{{emotion_detected}}",
  "counselorInsight": "Human-like, empathic, short and impactful. Acknowledge the user's emotion.",
  "analysis": {
    "goal": "Clearly identified goal from user answers",
    "risks": ["Risk 1", "Risk 2"],
    "swot": {
      "strengths": [],
      "weaknesses": [],
      "opportunities": [],
      "threats": []
    },
    "options": [
      { "title": "Option name", "summary": "Short description" }
    ],
    "riskScore": 1-10,
    "finalDecision": "**BOLD FINAL DECISION**",
    "executionPlan": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    "confidence": 0-100
  },
  "realityCheck": "1-2 brutally honest lines based on constraints + world conditions."
}`;

export function detectEmotion(answers) {
  const text = Object.values(answers).join(" ").toLowerCase();

  if (text.includes("fear") || text.includes("scared")) return "anxious";
  if (text.includes("confused") || text.includes("not sure")) return "confused";
  if (text.includes("excited") || text.includes("big")) return "ambitious";
  if (text.includes("pressure") || text.includes("family")) return "pressured";
  return "neutral";
}

export async function generateAnalysis(decision, answers, config) {
  const emotion = detectEmotion(answers);
  const { language, tone } = config;

  // Optimized prompt mapping user inputs
  const finalPrompt = `
    Decision: ${decision}
    Answers: ${JSON.stringify(answers)}
    Emotion: ${emotion}
    Language: ${language}
    Tone: ${tone}
    
    ${SYSTEM_PROMPT}
    
    IMPORTANT: Respond ONLY in ${language}. If Hinglish, use a mix of English and Hindi as used in urban India. Output must be valid JSON matching the format above.
  `;

  try {
    // UPDATED: Using gemini-2.5-flash-lite as per verified ListModels call
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
