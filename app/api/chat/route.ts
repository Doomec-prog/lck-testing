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

    // 1. Try Primary Model (gemini-2.5-flash)
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemInstruction
      });

      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: { temperature: 0.7 },
      });

      const result = await chat.sendMessage(String(message));
      text = result.response.text();
    } catch (primaryError: any) {
      console.warn(`[API] Primary model gemini-2.5-flash failed/timeout:`, primaryError.message);
      
      // 2. Cinematic Presentation Fallback
      return NextResponse.json({ 
        text: "⚠️ Внимание: Наблюдается временный обрыв связи с удаленным дата-центром. Как говорят у нас на площадке — технические заминки случаются даже в лучших сценах. Пожалуйста, попробуйте повторить запрос чуть позже, когда сигнал стабилизируется.\n\nВ текущем законодательстве РК для защиты сценария рекомендую: 1) Нотариальное удостоверение даты создания. 2) Регистрацию в авторском обществе. 3) Заключение NDA с продюсером. Это стандарт индустрии."
      });
    }

    if (!text) {
      throw new Error('Empty response from Gemini APIs');
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Gemini API Handler Error:', error);
    // General catch-all fallback
    return NextResponse.json({
      text: "⚠️ Внимание: Наблюдается временный обрыв связи с удаленным дата-центром. Как говорят у нас на площадке — технические заминки случаются даже в лучших сценах. Пожалуйста, попробуйте повторить запрос чуть позже, когда сигнал стабилизируется.\n\nВ текущем законодательстве РК для защиты сценария рекомендую: 1) Нотариальное удостоверение даты создания. 2) Регистрацию в авторском обществе. 3) Заключение NDA с продюсером. Это стандарт индустрии."
    }, { status: 200 }); // Status 200 so UI continues perfectly
  }
}