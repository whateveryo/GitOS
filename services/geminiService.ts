
import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL } from '../constants';

/**
 * Initializes GoogleGenAI and generates content.
 * @param prompt The text prompt to send to the model.
 * @param systemInstruction An optional system instruction.
 * @returns The generated text content from the model.
 * @throws Error if API key is not available or if content generation fails.
 */
export const generateGeminiContent = async (
  prompt: string,
  systemInstruction?: string
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const config: GenerateContentParameters = {
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 200, // Reasonable max output for suggestions
      thinkingConfig: { thinkingBudget: 50 }, // Allocate some tokens for thinking
    },
  };

  if (systemInstruction) {
    config.config = {
      ...config.config,
      systemInstruction: systemInstruction,
    };
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent(config);
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    // Graceful retry logic (e.g., exponential backoff) could be implemented here
    throw new Error(`Failed to get response from Gemini: ${error instanceof Error ? error.message : String(error)}`);
  }
};
