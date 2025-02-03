import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { getAllBlogs, getBlogsByUserId } from "@/graphql/services/blog.service";
import { ApolloError } from "apollo-server-errors";

type GetAllByUserBlogControllerType = {
    ctx: GQLContext,
}

export const getAllByUserBlogController = async ({ ctx }: GetAllByUserBlogControllerType) => {
    console.log('ctx', ctx); 
    if (!ctx?.auth) {
        return new ApolloError("unauthorized", "401");
    }

    try {
        const blogs = await getBlogsByUserId(Number(ctx.user.user.id));

        return blogs;
    } catch (error) {
        return new Error("An error occurred while fetching blogs");
    }
}
