import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

const connectionString = process.env.SUPABASE_CONNECTION_STRING!;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
