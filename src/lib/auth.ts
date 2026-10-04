import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ?? "Acme <onboarding@resend.dev>";

if (!resendApiKey) {
  console.warn(
    "[auth] Missing RESEND_API_KEY. Email verification and password reset emails will fail until it is added to .env.local."
  );
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const mongoUrl =
  process.env.BETTER_AUTH_DB_URL ??
  process.env.MONGODB_URI ??
  "mongodb://127.0.0.1:27017/my_result";
const dbName = process.env.MONGODB_DB ?? "my_result";

const client = new MongoClient(mongoUrl);
await client.connect();
const db = client.db(dbName);

async function sendEmailWithResend({
  to,
  subject,
  html,
}: {
  to: string[];
  subject: string;
  html: string;
}) {
  if (!resend) {
    throw new Error(
      "RESEND_API_KEY is missing. Add it to your .env.local file before enabling email verification."
    );
  }

  return resend.emails.send({
    from: resendFromEmail,
    to,
    subject,
    html,
  });
}

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmailWithResend({
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
      const { data, error } = await sendEmailWithResend({
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