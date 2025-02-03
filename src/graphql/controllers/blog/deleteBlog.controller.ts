import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { deleteBlog } from "@/graphql/services/blog.service";
import { ApolloError } from "apollo-server-errors";

type DeleteBlogControllerType = {
    ctx: GQLContext,
    blogId: number
}

export const deleteBlogController = async ({ blogId, ctx }: DeleteBlogControllerType) => {
    if (!ctx.auth) {
        return new ApolloError("unauthorized", "401");
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
