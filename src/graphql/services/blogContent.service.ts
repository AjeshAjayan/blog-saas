import { db } from "@/database";
import { InsertBlogContent, blogContentTable, SelectBlogContent } from "@/schema/blogContentTable";
import { eq } from "drizzle-orm";

export const addBlogContent = async (content: InsertBlogContent) => {
    const [newContent] = await db.insert(blogContentTable).values(content).returning();
    return newContent;
};

export const updateBlogContent = async (id: number, content: string) => {
    const updatedContent = await db
        .update(blogContentTable)
        .set({ content })
        .where(eq(blogContentTable.id, id))
        .returning();
    return updatedContent;
};

export const getBlogContentByBlogId = async (blogId: number): Promise<SelectBlogContent[]> => {
    return await db.select().from(blogContentTable).where(eq(blogContentTable.blogId, blogId));
};

export const deleteBlogContent = async (id: number) => {
    await db.delete(blogContentTable).where(eq(blogContentTable.id, id));
};
