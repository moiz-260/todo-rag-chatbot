import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Todo from '@/src/models/Todo';
import { ApiStatus } from '@/src/constants/apiStatus';
// import { upsertTodoToPinecone } from '@/src/lib/ai';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const email = searchParams.get('email');

        if (!userId && !email) {
            return NextResponse.json(
                { error: 'User ID or Email is required' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const filter = email ? { email } : { userId };
        const todos = await Todo.find(filter).sort({ createdAt: -1 });
        return NextResponse.json({ todos }, { status: ApiStatus.SUCCESS });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch todos' },
            { status: ApiStatus.SERVER_ERROR }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { title, description, userId, email } = body;

        if (!title || !description || !userId) {
            return NextResponse.json(
                { error: 'Title, description, userId, and email are required' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const todo = await Todo.create({
            title,
            description,
            userId,
            email,
        });

        // Sync with Pinecone for Chatbot
        // try {
        //     await upsertTodoToPinecone({
        //         id: todo._id.toString(),
        //         title: todo.title,
        //         description: todo.description,
        //         userId: todo.userId,
        //         email: todo.email,
        //     });
        // } catch (pineconeError) {
        //     console.error('Failed to sync with Pinecone:', pineconeError);
        //     // We don't want to fail the main request if Pinecone fails, 
        //     // but in a real app you might want to retry or handle this.
        // }

        return NextResponse.json({ todo }, { status: ApiStatus.SUCCESS });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create todo';
        const stack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;

        return NextResponse.json(
            { error: message, stack },
            { status: ApiStatus.SERVER_ERROR }
        );
    }

}
