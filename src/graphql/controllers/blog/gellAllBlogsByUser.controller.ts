import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { getAllBlogs, getBlogsByUserId } from "@/graphql/services/blog.service";

type GetAllByUserBlogControllerType = {
    ctx: GQLContext,
}

export const getAllByUserBlogController = async ({ ctx }: GetAllByUserBlogControllerType) => {
    // console.log('ctx', ctx); 
    if (!ctx?.auth) {
        return new Error("You are not authorized to perform this action");
    }

    try {
        const blogs = await getBlogsByUserId(Number(ctx.user.user.id));

        return blogs;
    } catch (error) {
        return new Error("An error occurred while fetching blogs");
    }
}
