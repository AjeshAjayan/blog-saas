import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './usersTable';

export const blogTable = pgTable('blogs_table', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertPost = typeof blogTable.$inferInsert;
export type SelectPost = typeof blogTable.$inferSelect;
