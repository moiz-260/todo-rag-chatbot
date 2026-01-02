import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import User from '@/src/models/User';
import jwt from 'jsonwebtoken';
import { ApiStatus } from '@/src/constants/apiStatus';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const { fullName, dateOfBirth, phoneNumber, email, password } = body;

        if (!fullName || !dateOfBirth || !phoneNumber || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: ApiStatus.BAD_REQUEST }
            );
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { phoneNumber }],
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    error: existingUser.email === email
                        ? 'Email already registered'
                        : 'Phone number already registered',
                },
                { status: ApiStatus.CONFLICT }
            );
        }

        const user = await User.create({
            fullName,
            dateOfBirth,
            phoneNumber,
            email,
            password,
        });

        if (!process.env.JWT_SECRET) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: ApiStatus.SERVER_ERROR }
            );
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json(
            {
                success: true,
                message: 'User created successfully',
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
        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                return NextResponse.json(
                    { error: 'Validation failed', details: (error as any).errors },
                    { status: ApiStatus.BAD_REQUEST }
                );
            }

            if (error.name === 'MongooseServerSelectionError') {
                return NextResponse.json(
                    { error: 'Database connection failed. Please check your MongoDB URI.' },
                    { status: ApiStatus.SERVER_ERROR }
                );
            }

            return NextResponse.json(
                {
                    error: 'Internal server error',
                    message: error.message,
                    details: process.env.NODE_ENV === 'development' ? (error as any).stack : undefined
                },
                { status: ApiStatus.SERVER_ERROR }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: ApiStatus.SERVER_ERROR }
        );
    }
}