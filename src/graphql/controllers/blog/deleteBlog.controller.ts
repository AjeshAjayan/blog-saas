import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { deleteBlog } from "@/graphql/services/blog.service";

type DeleteBlogControllerType = {
    ctx: GQLContext,
    blogId: number
}

export const deleteBlogController = async ({ blogId, ctx }: DeleteBlogControllerType) => {
    if (!ctx.auth) {
        return new Error("You are not authorized to perform this action");
    }

    if(!blogId) {
        return new Error("Nothing to delete");
    }

    try {
        await deleteBlog(Number(blogId));

        return {
            message: "Blog deleted successfully",
        }
    } catch (error) {
        return new Error("An error occurred while deleting a blog");
    }
}
