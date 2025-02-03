import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { getAllBlogs } from "@/graphql/services/blog.service";

type GetAllBlogControllerType = {
    ctx: GQLContext,
}

export const getAllBlogController = async ({ ctx }: GetAllBlogControllerType) => {
    if (!ctx?.auth) {
        return new Error("You are not authorized to perform this action");
    }

    try {
        const blogs = await getAllBlogs();

        return blogs;
    } catch (error) {
        return new Error("An error occurred while fetching all blogs");
    }
}
