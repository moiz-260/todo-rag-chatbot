import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Todo from '@/src/models/Todo';
import { ApiStatus } from '@/src/constants/apiStatus';
import { verifyToken } from '@/src/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const user = await verifyToken(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized access' },
                { status: ApiStatus.UNAUTHORIZED }
            );
        }

        const todos = await Todo.find({ userId: user.userId }).sort({ createdAt: -1 });
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

        const user = await verifyToken(request);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized access' },
                { status: ApiStatus.UNAUTHORIZED }
            );
        }

        const body = await request.json();
        const { title, description } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const todo = await Todo.create({
            title,
            description,
            userId: user.userId,
            email: user.email,
        });

        return NextResponse.json({ todo }, { status: ApiStatus.SUCCESS });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create todo';
        return NextResponse.json(
            { error: message },
            { status: ApiStatus.SERVER_ERROR }
        );
    }
}
