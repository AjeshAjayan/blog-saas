import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './usersTable';

export const blogTable = pgTable('blogs', {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    isDeleted: boolean('is_deleted').default(false),
    published: boolean('published').default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertBlog = typeof blogTable.$inferInsert;
export type SelectBlog = typeof blogTable.$inferSelect;
