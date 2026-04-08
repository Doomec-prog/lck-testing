import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], systemInstruction } = body;

    // Securely access the API key from the server environment
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error('CRITICAL ERROR: API_KEY is missing.');
      return NextResponse.json({
        error: 'Configuration Error',
        details: 'API_KEY is not set on the server.'
      }, { status: 500 });
    }

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Initialize Gemini AI (Standard SDK)
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Validate and format history
    const formattedHistory = Array.isArray(history)
      ? history
        .filter((msg: any) => msg && msg.text)
        .map((msg: any) => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(msg.text) }]
        }))
      : [];

    let text = "";

    // 1. Try Primary Model (gemini-2.0-flash)
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemInstruction
      });

      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: { temperature: 0.7 },
      });

      const result = await chat.sendMessage(String(message));
      text = result.response.text();
    } catch (primaryError: any) {
      console.warn(`[API] Primary model gemini-2.0-flash failed:`, primaryError.message);
      
      // 2. Fallback to older stable model (gemini-1.5-flash) if 503 or 429
      try {
        const fallbackModel = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemInstruction
        });

        const fallbackChat = fallbackModel.startChat({
          history: formattedHistory,
          generationConfig: { temperature: 0.7 },
        });

        const result = await fallbackChat.sendMessage(String(message));
        text = result.response.text();
      } catch (fallbackError: any) {
        console.error(`[API] Fallback model gemini-1.5-flash also failed:`, fallbackError.message);
        // 3. Graceful UI degradation
        return NextResponse.json({ 
          text: "К сожалению, серверы искусственного интеллекта сейчас испытывают высокую нагрузку. Пожалуйста, попробуйте задать ваш вопрос через пару минут." 
        });
      }
    }

    if (!text) {
      throw new Error('Empty response from Gemini APIs');
    }

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error('Gemini API Handler Error:', error);
    return NextResponse.json({
      error: 'Failed to generate response',
      details: error.message || String(error)
    }, { status: 500 });
  }
}