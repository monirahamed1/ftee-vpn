import { GoogleGenAI } from "@google/genai";
import { ServerLocation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeConnectionSecurity = async (
  server: ServerLocation, 
  protocol: string
): Promise<string> => {
  try {
    const prompt = `
      Act as a cybersecurity expert for a futuristic VPN interface.
      The user has connected to a server in ${server.city}, ${server.name} using the ${protocol} protocol.
      Latency is ${server.latency}ms.
      
      Provide a very short, punchy, 1-sentence diagnostic message that sounds like a high-tech system status report. 
      Focus on encryption level, route optimization, or threat masking.
      Do not use markdown. Keep it under 20 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SECURE CHANNEL ESTABLISHED. ENCRYPTION ACTIVE.";
  }
};