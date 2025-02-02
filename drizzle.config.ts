import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export default defineConfig({
    schema: "./src/schema/schema.ts",
    out: "./src/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
