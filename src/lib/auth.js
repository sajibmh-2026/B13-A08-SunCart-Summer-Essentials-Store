import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoClient } from "@/lib/mongodb";

// Lazy initialization — avoids top-level await which breaks on Vercel serverless
let _auth = null;

export async function getAuth() {
  if (_auth) return _auth;

  const client = await getMongoClient();
  const db = client.db();

  _auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET || "default-secret-change-me",
    database: mongodbAdapter(db, { client }),
    plugins: [nextCookies()],
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
    },
  });

  return _auth;
}
