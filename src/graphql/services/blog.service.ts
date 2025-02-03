import { db } from "@/database";
import { InsertBlog, blogTable, SelectBlog } from "@/schema/blogTable";
import { eq } from "drizzle-orm";

export const addBlog = async (blog: InsertBlog) => {
    const [newBlog] = await db.insert(blogTable).values(blog).returning();
    return newBlog;
};

export const updateBlog = async (id: number, title: string) => {
    const updatedBlog = await db
        .update(blogTable)
        .set({ title })
        .where(eq(blogTable.id, id))
        .returning();
    return updatedBlog;
};

export const getBlogsByUserId = async (userId: number): Promise<SelectBlog[]> => {
    return await db.select().from(blogTable).where(eq(blogTable.userId, userId));
};

export const getAllBlogs = async (): Promise<SelectBlog[]> => {
    return await db.select().from(blogTable);
};

export const deleteBlog = async (id: number) => {
    await db.delete(blogTable).where(eq(blogTable.id, id));
};
