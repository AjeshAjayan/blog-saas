import { GQLContext } from '@/graphql/resolvers/auth.resolver';

export const statusController = async (ctx: GQLContext) => {
    return {
        ...ctx,
        user: ctx.user.user
    };
}
