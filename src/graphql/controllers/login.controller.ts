import { getUserByEmail } from "@/graphql/services/users.service";
import { generateResponseFormat } from "@/utils/generateResponseFormat";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function loginController(request: Request) {

    try {
        const {
            email,
            password,
        } = await request.json();

        const user = await getUserByEmail(email);
        console.log('user', user);
        if (!user) {
            return Response.json(
                generateResponseFormat(
                    'User not found',
                    404,
                    'not-found',
                    null,
                ),
                { status: 404 },
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return Response.json(generateResponseFormat(
                'Invalid credentials',
                403,
                'forbidden',
                null,
            ), { status: 403 });
        } else {
            const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
                expiresIn: '3h'
            });

            Response.json(
                generateResponseFormat(
                    'Logged in successfully',
                    200,
                    'success',
                    {},
                ),
                {
                    status: 200,
                    headers: {
                        'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`,
                    },
                }
            );
        }

    } catch (err) {
        console.error('Error while calling loginController', err);
        Response.json(
            generateResponseFormat(
                'Something went wrong',
                500,
                'error',
                null,
            )
        );
    }
}