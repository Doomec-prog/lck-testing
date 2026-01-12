import { GoogleGenAI } from '@google/genai';

export default async function handler(request, response) {
  // CORS configuration
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse body if it's a string (sometimes happens in Vercel environments)
    let body = request.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('JSON Parse Error:', e);
        return response.status(400).json({ error: 'Invalid JSON body' });
      }
    }
    
    const { message, history = [], systemInstruction } = body || {};
    
    // Securely access the API key from the server environment
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error('CRITICAL ERROR: API_KEY is missing in Vercel Environment Variables.');
      return response.status(500).json({ 
        error: 'Configuration Error', 
        details: 'API_KEY is not set on the server.' 
      });
    }

    if (!message) {
      return response.status(400).json({ error: 'Message is required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Validate and format history
    // Ensure strict valid types for parts
    const formattedHistory = Array.isArray(history) 
      ? history
          .filter(msg => msg && msg.text) // Filter out empty messages
          .map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: String(msg.text) }]
          }))
      : [];

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { 
        systemInstruction: systemInstruction || undefined,
        temperature: 0.7 
      },
      history: formattedHistory
    });

    // CORRECTED: sendMessage expects an object { message: string }, not just a string.
    const result = await chat.sendMessage({ message: String(message) });
    
    if (!result || !result.text) {
      throw new Error('Empty response from Gemini API');
    }

    return response.status(200).json({ text: result.text });

  } catch (error) {
    console.error('Gemini API Handler Error:', error);
    
    // Return detailed error message for debugging Vercel logs
    return response.status(500).json({ 
      error: 'Failed to generate response', 
      details: error.message || String(error)
    });
  }
}