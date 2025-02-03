import { db } from "@/database";
import { InsertBlog, blogTable, SelectBlog } from "@/schema/blogTable";
import { eq, and } from "drizzle-orm";

export const addBlog = async (blog: InsertBlog) => {
    const [newBlog] = await db.insert(blogTable).values(blog).returning();
    return newBlog;
};

export const updateBlog = async (id: number, title: string, content: string) => {
    const updatedBlog = await db
        .update(blogTable)
        .set({ title, content })
        .where(eq(blogTable.id, id))
        .returning();
    return updatedBlog;
};

export const getBlogsByUserId = async (userId: number): Promise<SelectBlog[]> => {
    return await db.select().from(blogTable).where(and(eq(blogTable.userId, userId)));
};

export const getBlogsBySlug = async (slug: string): Promise<SelectBlog[]> => {
    return await db.select().from(blogTable).where(eq(blogTable.slug, slug));
};

export const getBlogById = async (id: number): Promise<SelectBlog | undefined> => {
    return await db.select().from(blogTable).where(eq(blogTable.id, id)).limit(1).then(rows => rows[0]);
};

export const getBlogsBySlugAndUserId = async (slug: string, userId: number): Promise<SelectBlog[]> => {
    return await db.select().from(blogTable).where(and(eq(blogTable.slug, slug), eq(blogTable.userId, userId)));
};

export const getPublishedBlogsBySlugAndUserId = async (slug: string, userId: number): Promise<SelectBlog[]> => {
    return await db.select()
        .from(blogTable)
        .where(
            and(
                eq(blogTable.slug, slug), 
                eq(blogTable.userId, userId), 
                eq(blogTable.published, true)
            )
        );
};

export const getAllBlogs = async (): Promise<SelectBlog[]> => {
    return await db.select().from(blogTable);
};

export const deleteBlog = async (id: number) => {
    await db.delete(blogTable).where(eq(blogTable.id, id));
};

export const publishBlog = async (id: number) => {
    await db.update(blogTable).set({ published: true }).where(eq(blogTable.id, id));
}

export const unpublishBlog = async (id: number) => {
    await db.update(blogTable).set({ published: false }).where(eq(blogTable.id, id));
}
