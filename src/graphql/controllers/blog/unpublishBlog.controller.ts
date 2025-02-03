import { GQLContext } from "@/graphql/resolvers/auth.resolver"
import { unpublishBlog } from "@/graphql/services/blog.service"

export const unpublishBlogController = async (id: number, ctx: GQLContext) => {
    try {
        await unpublishBlog(id);
        return {
            message: "Blog published successfully",
        }
    } catch (error) {
        return new Error("An error occurred while publishing a blog");
    }
}
