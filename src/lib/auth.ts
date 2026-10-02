import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your password",
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      console.log("Sending email verification to:", user.email, "with URL:", url);
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
      });

      if (error) {
        console.error("Failed to send verification email:", error);
      }

      if (data) {
        console.log("Verification email response:", data);
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  database: mongodbAdapter(db, { transaction: false }),
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});