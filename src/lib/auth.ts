import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUrl = process.env.BETTER_AUTH_DB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_DB_URL is not defined");
}

const client = new MongoClient(mongoUrl);
await client.connect()
const db = client.db('my_result');

export const auth = betterAuth({
  emailAndPassword:{
    enabled: true,
  },
  database: mongodbAdapter(db),
  baseURL: "http://localhost:3000",
    // ...existing code...

});

