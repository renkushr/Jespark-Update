
import { GoogleGenAI } from "@google/genai";
import { Reward, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRewardSuggestions = async (userPoints: number, rewards: Reward[], query: string): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  const rewardsContext = rewards.map(r => 
    `- ${r.name} (${r.points} pts): ${r.description}`
  ).join('\n');

  const systemInstruction = `
    You are Jespark's AI Assistant. 
    User currently has ${userPoints} points in their Jespark account.
    Available rewards:
    ${rewardsContext}
    
    Recommend rewards based on the user's query and their point balance. 
    Be helpful, concise, and professional. 
    If they don't have enough points for a recommendation, mention how many more they need.
    ALWAYS respond in Thai language.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "ไม่พบคำแนะนำที่เหมาะสม มีอะไรให้ผมช่วยเพิ่มเติมไหมครับ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ขออภัยครับ เกิดข้อขัดข้องในการเชื่อมต่อ โปรดลองใหม่อีกครั้งในภายหลัง";
  }
};
