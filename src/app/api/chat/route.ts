import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini SDK with API key from env
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();

    // The system prompt to configure the cafe persona
    const systemInstruction = `You are a friendly, intelligent AI Assistant for "AI Smart Cafe". 
Your job is to help customers choose coffee, pastries, and other cafe items. 
Always be polite, welcoming, and concise. 
If asked about the cafe, mention it's a modern cafe powered by AI precision and premium ingredients.
If they ask for recommendations, suggest our Signature items like Midnight Espresso, Caramel Cloud Latte, or Matcha Zen.
Format your responses using clean, plain text or simple markdown.`;

    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    // We start a chat session. If history is provided, we format it for Gemini
    const formattedHistory = history ? history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })) : [];

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Sorry, I am having trouble connecting to my brain right now." },
      { status: 500 }
    );
  }
}
