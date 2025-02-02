import { createUser } from '@/services/users.service';
import { cookies } from 'next/headers'

export async function signUpController(fullName: string, email: string, password: string) {
    try {
        
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
    
        await createUser({
            name: fullName,
            email,
            password,
        });
    
        return {
            message: 'User created successfully',
        };
    } catch(e) {
        console.error(e);
        if(((e as any).code) === '23505') {
            throw new Error('User already exists');
        }
        throw new Error('Error while creating user');
    }
}
