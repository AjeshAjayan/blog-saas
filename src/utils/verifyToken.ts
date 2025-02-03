import jwt from 'jsonwebtoken'; 
import { cookies } from 'next/headers';

type VerifyTokenReturnType = {
    auth: boolean;
    user: any;
}

export const verifyToken = async (): Promise<VerifyTokenReturnType> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return {
            auth: false,
            user: null,
        };
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return {
            auth: true,
            user: decoded,
        };
    } catch (err) {
        return {
            auth: false,
            user: null,
        };
    }
}
