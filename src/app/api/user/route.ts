import { createUser } from '@/services/users.service';
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { fullName, email, password } = await request.json();
        
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
    
        await createUser({
            name: fullName,
            email,
            password,
        });
    
        return Response.json({
            status: 200,
            statusText: 'OK',
            message: 'User created successfully',
        }, { status: 200 });
    } catch(e) {
        console.error(e);
        if(((e as any).code) === '23505') {
            return Response.json({
                status: 409,
                statusText: 'Conflict',
                message: 'User already exists',
            }, {
                status: 409,
            });
        }
        return Response.json({
            status: 500,
            statusText: 'Internal Server Error',
            error: e
        }, {
            status: 500,
        });
    }
}
