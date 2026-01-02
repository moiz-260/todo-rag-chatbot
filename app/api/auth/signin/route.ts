import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import User from '@/src/models/User';
import jwt from 'jsonwebtoken';
import { ApiStatus } from '@/src/constants/apiStatus';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email' },
                { status: ApiStatus.UNAUTHORIZED }
            );
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: ApiStatus.UNAUTHORIZED }
            );
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    dateOfBirth: user.dateOfBirth,
                },
                token,
            },
            { status: ApiStatus.SUCCESS }
        );
    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : 'Internal server error';
        const stack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;

        return NextResponse.json(
            { error: message, stack },
            { status: ApiStatus.SERVER_ERROR }
        );
    }

}
