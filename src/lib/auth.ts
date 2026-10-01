import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUrl =
  process.env.BETTER_AUTH_DB_URL ??
  process.env.MONGODB_URI ??
  "mongodb://127.0.0.1:27017/my_result";

const dbName = process.env.MONGODB_DB ?? "my_result";

const client = new MongoClient(mongoUrl);
await client.connect();
const db = client.db(dbName);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    transaction: false,
  }),
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

