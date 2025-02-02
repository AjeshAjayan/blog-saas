import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './usersTable';

export const blogTable = pgTable('blogs_table', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertBlog = typeof blogTable.$inferInsert;
export type SelectBlog = typeof blogTable.$inferSelect;
