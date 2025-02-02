import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { blogTable } from './blogTable';

export const blogContentTable = pgTable('blogs_table', {
    id: serial('id').primaryKey(),
    blogId: integer('blog_id')
        .notNull()
        .references(() => blogTable.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

export type InsertBlogContent = typeof blogTable.$inferInsert;
export type SelectBlogContent = typeof blogTable.$inferSelect;
