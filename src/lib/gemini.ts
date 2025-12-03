import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (error) {
    console.warn("Error initializing Gemini AI:", error);
  }
}

export async function sendMessageToGemini(message: string): Promise<string> {
  if (!API_KEY || !model) {
    return "Desculpe, o assistente não está configurado no momento. Por favor, entre em contato através do formulário.";
  }

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error sending message to Gemini API:", error);
    return "Desculpe, não consegui processar sua solicitação no momento.";
  }
}
