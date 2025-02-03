import { GQLContext } from "@/graphql/resolvers/auth.resolver";
import { addBlog, getBlogsBySlugAndUserId, updateBlog } from "@/graphql/services/blog.service";
import { ApolloError } from "apollo-server-errors";

type AddBlogControllerType = {
    title: string;
    contents: string;
    id?: number;
    ctx: GQLContext
}

export const addBlogController = async ({ id, title, contents, ctx }: AddBlogControllerType) => {
    if(!ctx.auth) {
        return new ApolloError("You are not authorized to perform this action", "401");
    }

    try {
        const slug = title.split(' ').join('-').toLocaleLowerCase();
        if(Number(id)) {
            // perform update
            const blog = await updateBlog(Number(id), title, contents);
            console.log('update', blog, id);
            return {
                message: "Blog updated successfully",
                ...blog[0]
            }
        }

        // Add blog

        const blog = await addBlog({ 
            title,
            userId: ctx.user.user.id, 
            slug,
            content: contents
        });

        /**
         * Keeping below code comment: there code will be required on future to make the blog content scalable 
         */
        // Add blog content
        // const promises: Promise<any>[] = [];
        // for (let i = 0; i < contents.length; i++) {
        //     promises.push(addBlogContent({ content: contents[i], blogId: blog.id, order: i + 1 }));
        // }
        // await Promise.all(promises);
        
        return {
            message: "Blog added successfully",
            ...blog
        }
    } catch (error) {
        if(((error as any).constraint ?? '') === 'blogs_title_unique') {
            return new Error("Another post exist with same title");
        }
        return new Error("An error occurred while adding a blog");
    }
}
