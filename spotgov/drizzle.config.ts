import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './database/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_CONNECTION_STRING!,
  },
});
