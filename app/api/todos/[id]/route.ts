import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Todo from '@/src/models/Todo';
import mongoose from 'mongoose';
import { ApiStatus } from '@/src/constants/apiStatus';
// import { upsertTodoToPinecone, deleteTodoFromPinecone } from '@/src/lib/ai';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
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

        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return NextResponse.json(
                { error: 'Todo not found' },
                { status: ApiStatus.NOT_FOUND }
            );
        }

        // Sync with Pinecone
        // try {
        //     await upsertTodoToPinecone({
        //         id: todo._id.toString(),
        //         title: todo.title,
        //         description: todo.description,
        //         userId: todo.userId,
        //         email: todo.email,
        //     });
        // } catch (error) {
        //     console.error('Failed to update Pinecone:', error);
        // }

        return NextResponse.json({ todo }, { status: ApiStatus.SUCCESS });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update todo';
        const stack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;

        return NextResponse.json(
            { error: message, stack },
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

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid todo ID format' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return NextResponse.json(
                { error: 'Todo not found' },
                { status: ApiStatus.NOT_FOUND }
            );
        }

        // Sync with Pinecone
        // try {
        //     await deleteTodoFromPinecone(id);
        // } catch (error) {
        //     console.error('Failed to delete from Pinecone:', error);
        // }

        return NextResponse.json(
            { message: 'Todo deleted successfully', todo },
            { status: ApiStatus.SUCCESS }
        );
    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : 'Failed to delete todo';
        const stack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;

        return NextResponse.json(
            { error: message, stack },
            { status: ApiStatus.SERVER_ERROR }
        );
    }
}
