import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = process.env.MONGODB_URL ? new MongoClient(process.env.MONGODB_URL) : null;
const db = client ? client.db("bangla-news-24") : null;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  database: db && client ? mongodbAdapter(db, { client }) : undefined,
  onAPIError: {
    onError: (error) => {
      console.error("AUTH ERROR:", error);
    },
  },
});