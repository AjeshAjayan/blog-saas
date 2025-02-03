import { GQLContext } from "@/graphql/resolvers/auth.resolver"
import { publishBlog } from "@/graphql/services/blog.service"

export const publishBlogController = async (id: number, ctx: GQLContext) => {
    try {
        await publishBlog(id);
        return {
            message: "Blog published successfully",
        }
    } catch (error) {
        return new Error("An error occurred while publishing a blog");
    }
}
