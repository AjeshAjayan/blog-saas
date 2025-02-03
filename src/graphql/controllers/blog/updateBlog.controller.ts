import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { updateBlog } from "@/graphql/services/blog.service";
import { updateBlogContent } from "@/graphql/services/blogContent.service";
import { ApolloError } from "apollo-server-errors";

type UpdateBlogControllerType = {
    title: string;
    contents: string;
    ctx: GQLContext,
    blogId: number
}

export const updateBlogController = async ({ title, contents, ctx, blogId }: UpdateBlogControllerType) => {
    if (!ctx.auth) {
        return new ApolloError("unauthorized", "401");
    }

    if(!blogId || !title || contents.length === 0) {
        return new Error("Nothing to update");
    }

    try {
        if(title) {
            await updateBlog(blogId, title, contents);
        }
        // Add blog content
        const promises: Promise<any>[] = [];
        for (let i = 0; i < contents.length; i++) {
            promises.push(updateBlogContent(blogId, contents[i]));
        }
        await Promise.all(promises);

        return {
            message: "Blog updated successfully",
        }
    } catch {
        return new Error("An error occurred while updating a blog");
    }
}
