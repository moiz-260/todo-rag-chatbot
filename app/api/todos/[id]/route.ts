import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Todo from '@/src/models/Todo';
import mongoose from 'mongoose';
import { ApiStatus } from '@/src/constants/apiStatus';
import { verifyToken } from '@/src/lib/auth';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const user = await verifyToken(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: ApiStatus.UNAUTHORIZED });
        }

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid todo ID format' },
                { status: ApiStatus.BAD_REQUEST }
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

        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: user.userId },
            { title, description },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return NextResponse.json(
                { error: 'Todo not found or unauthorized' },
                { status: ApiStatus.NOT_FOUND }
            );
        }

        return NextResponse.json({ todo }, { status: ApiStatus.SUCCESS });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update todo';
        return NextResponse.json(
            { error: message },
            { status: ApiStatus.SERVER_ERROR }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const user = await verifyToken(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: ApiStatus.UNAUTHORIZED });
        }

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid todo ID format' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const todo = await Todo.findOneAndDelete({ _id: id, userId: user.userId });

        if (!todo) {
            return NextResponse.json(
                { error: 'Todo not found or unauthorized' },
                { status: ApiStatus.NOT_FOUND }
            );
        }

        return NextResponse.json(
            { message: 'Todo deleted successfully', todo },
            { status: ApiStatus.SUCCESS }
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete todo';
        return NextResponse.json(
            { error: message },
            { status: ApiStatus.SERVER_ERROR }
        );
    }
}
