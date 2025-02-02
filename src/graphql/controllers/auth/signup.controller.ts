import { createUser } from '@/graphql/services/users.service';
import { GraphQLError } from 'graphql';

export async function signUpController(fullName: string, email: string, password: string) {
    try {

        // validate inputs
        if (!fullName || !email || !password) {
            return new GraphQLError('Name, email, and password are required', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }
    
        await createUser({
            name: fullName,
            email,
            password,
        });
    
        return {
            message: 'User created successfully',
        };
    } catch(e) {
        if(((e as any).code) === '23505') {
            return new GraphQLError('Email already exists', {
                extensions: { code: 'BAD_USER_INPUT' },
            });
        }
        return new GraphQLError('Something went wrong', {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
    }
}
