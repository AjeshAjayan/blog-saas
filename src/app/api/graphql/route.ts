import { resolvers, typeDefs } from '@/graphql/graphql';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = startServerAndCreateNextHandler(apolloServer as any);

export async function GET(req: Request) {
    return handler(req);
}

export async function POST(req: Request) {
    return handler(req);
}