import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

interface UserPayload {
    userId: string;
    email: string;
}

export async function verifyToken(request: NextRequest): Promise<UserPayload | null> {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.split(' ')[1];
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}
