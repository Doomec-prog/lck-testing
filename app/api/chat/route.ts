import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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

    const ai = new GoogleGenAI({ apiKey });

    // Validate and format history
    const formattedHistory = Array.isArray(history) 
      ? history
          .filter((msg: any) => msg && msg.text)
          .map((msg: any) => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: String(msg.text) }]
          }))
      : [];

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { 
        systemInstruction: systemInstruction || undefined,
        temperature: 0.7 
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage({ message: String(message) });
    
    if (!result || !result.text) {
      throw new Error('Empty response from Gemini API');
    }

    return NextResponse.json({ text: result.text });

  } catch (error: any) {
    console.error('Gemini API Handler Error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate response', 
      details: error.message || String(error)
    }, { status: 500 });
  }
}