import { NextRequest, NextResponse } from 'next/server';
import { openai, pc, queryTodos } from '@/src/lib/ai';
import { verifyToken } from '@/src/lib/auth';
import { ApiStatus } from '@/src/constants/apiStatus';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { message, userId, email } = body;

    if (!userId || !email) {
      const decoded = await verifyToken(request);
      if (decoded) {
        userId = userId || decoded.userId;
        email = email || decoded.email;
      }
    }

    if (!message || (!userId && !email)) {
      return NextResponse.json(
        { error: 'Message and authentication (token or body) are required' },
        { status: ApiStatus.BAD_REQUEST }
      );
    }
    const relevantTodos = await queryTodos(userId, email, message);

    const context =
      relevantTodos.length > 0
        ? relevantTodos
            .map(
              (t: any) => `- Title: ${t.title}\n  Description: ${t.description}`
            )
            .join('\n\n')
        : 'No relevant todos found.';

    const prompt = `
You are a specialized Todo Assistant called IntelliTask. Your ONLY purpose is to help the user manage their todos and answer questions about this specific Todo application.

USER QUERY: "${message}"

RELEVANT TODO CONTEXT:
${context}

STRICT GUIDELINES:
1. If the user's query is unrelated to their todos, the todo list, or how to use this application (e.g., asking about general knowledge, geography, sports, etc.), you MUST politely decline. 
   Response for out-of-scope: "I'm sorry, but I can only assist with tasks and information related to this Todo application. That's outside my current scope."
2. If the user asks how to create, edit, or delete a task, explain the UI process (e.g., "Use the form on the left to add a title and description, then click 'Add Todo'").
3. Use the provided context to answer questions about existing todos.
4. Be professional, friendly, and very concise.
        `;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful Todo Assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    const botMessage = chatResponse.choices[0].message.content;

    return NextResponse.json(
      { message: botMessage },
      { status: ApiStatus.SUCCESS }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process chat', details: error.message },
      { status: ApiStatus.SERVER_ERROR }
    );
  }
}
