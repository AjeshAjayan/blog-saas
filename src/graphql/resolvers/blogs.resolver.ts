import { addBlogController } from "../controllers/blog/addBlog.controller";
import { deleteBlogController } from "../controllers/blog/deleteBlog.controller";
import { getAllBlogController } from "../controllers/blog/gellAllBlogs.controller";
import { getAllByUserBlogController } from "../controllers/blog/gellAllBlogsByUser.controller";
import { getBlogByIdController } from "../controllers/blog/getBlogById.controller";
import { publishBlogController } from "../controllers/blog/publishBlog.controller";
import { updateBlogController } from "../controllers/blog/updateBlog.controller";

export const blogResolvers = {
    Query: {
        blogs: (_: any, __: any, context: any) => {
            return getAllBlogController({ ctx: context });
        },
        blogBuUser: (_: any, __: any, context: any) => {
            return getAllByUserBlogController({ ctx: context });
        },
        blogById: (_: any, { id }: any, context: any) => {
            return getBlogByIdController(id, context);
        }
    },
    Mutation: {
        addBlog: (_: any, { id, title, contents }: any, context: any) => {
            return addBlogController({ id, title, contents, ctx: context });
        },
        updateBlog: (_: any, { id, title, contents }: any, context: any) => {
            return updateBlogController({ blogId: id, title, contents, ctx: context });
        },
        deleteBlog: (_: any, { id }: any, context: any) => {
            return deleteBlogController({ blogId: id, ctx: context });
        },
        publishBlog: (_: any, { id }: any, context: any) => {
            return publishBlogController(id, context);
        },
        unpublishBlog: (_: any, { id }: any, context: any) => {
            return publishBlogController(id, context);
        },
    }
}