import { getUserByEmail } from "@/graphql/services/users.service";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";

export async function loginController(email: string, password: string) {

    try {
        if (!email || !password) {
            return new Error('Email and password are required');
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return new Error('Invalid credentials');
        } else {
            const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
                expiresIn: '3h'
            });

            const cookieStore = await cookies();

            cookieStore.set('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'lax',
                path: '/',
            });

            return {
                message: 'User logged in successfully'
            };
        }

    } catch {
        return new Error('Something went wrong');
    }
}