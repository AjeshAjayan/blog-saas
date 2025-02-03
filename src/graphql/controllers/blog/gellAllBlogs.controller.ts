import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { getAllBlogs } from "@/graphql/services/blog.service";
import { ApolloError } from "apollo-server-errors";

type GetAllBlogControllerType = {
    ctx: GQLContext,
}

export const getAllBlogController = async ({ ctx }: GetAllBlogControllerType) => {
    if (!ctx?.auth) {
        return new ApolloError("unauthorized", "401");
    }

    try {
        const blogs = await getAllBlogs();

        return blogs;
    } catch (error) {
        return new Error("An error occurred while fetching all blogs");
    }
}
