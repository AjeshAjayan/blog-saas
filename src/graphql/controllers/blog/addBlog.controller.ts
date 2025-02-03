import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { addBlog } from "@/graphql/services/blog.service";
import { addBlogContent } from "@/graphql/services/blogContent.service";
import { ApolloError } from "apollo-server-errors";

type AddBlogControllerType = {
    title: string;
    contents: string[];
    ctx: GQLContext
}

export const addBlogController = async ({ title, contents, ctx }: AddBlogControllerType) => {
    if(!ctx.auth) {
        return new ApolloError("You are not authorized to perform this action", "401");
    }

    try {
        // Add blog
        const blog = await addBlog({ title, userId: ctx.user.user.id, slug: title.split(' ').join('-').toLocaleLowerCase() });
        // Add blog content
        const promises: Promise<any>[] = [];
        for (let i = 0; i < contents.length; i++) {
            promises.push(addBlogContent({ content: contents[i], blogId: blog.id, order: i + 1 }));
        }
        await Promise.all(promises);
        
        return {
            message: "Blog added successfully",
        }
    } catch (error) {
        return new Error("An error occurred while adding a blog");
    }
}
