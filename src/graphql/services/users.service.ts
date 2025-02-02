import { db } from "@/database";
import { InsertUser, usersTable } from "@/schema/usersTable";
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";

export async function createUser(data: InsertUser) {
    try {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        await db.insert(usersTable).values({ ...data, password: hashedPassword });
    } catch(e) {
        throw e;
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await db.select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1)
            .then((res) => res[0]);
    } catch(e) {
        throw e;
    }
}
