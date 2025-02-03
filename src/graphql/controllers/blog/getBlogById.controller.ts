import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { getBlogById } from "@/graphql/services/blog.service";
import { ApolloError } from "apollo-server-errors";

export const getBlogByIdController = (id: number, ctx: GQLContext) => {
    if (!ctx?.auth) {
        return new ApolloError("unauthorized", "401");
    }

    try {
        return getBlogById(id);
    } catch(e) {
        return new Error("An error occurred while fetching blogs");
    }
}
