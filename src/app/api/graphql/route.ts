import { resolvers, typeDefs } from '@/graphql/graphql';
import { verifyToken } from '@/utils/verifyToken';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    
});

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = startServerAndCreateNextHandler(apolloServer as any, {
    context: async () => {
        return await verifyToken();
    },
});

export async function GET(req: Request) {
    return handler(req);
}

export async function POST(req: Request) {
    return handler(req);
}

export async function OPTIONS(req: Request) {
    return new Response(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
}