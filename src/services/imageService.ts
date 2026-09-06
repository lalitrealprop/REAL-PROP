import { GoogleGenAI } from "@google/genai";

export async function generateHeroImage(logoBase64: string) {
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: logoBase64,
            mimeType: "image/png",
          },
        },
        {
          text: "Create a professional real estate hero background image for a website. Integrate the provided 'REAL PROP' logo naturally into a scene featuring modern skyscrapers and luxury residential buildings. The style should be high-end, clean, and modern. Use a sunset or golden hour lighting to create a warm and inviting atmosphere. The logo should be clearly visible but integrated as part of the overall professional design, perhaps as a subtle overlay or a high-quality graphic element in the center.",
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates![0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
