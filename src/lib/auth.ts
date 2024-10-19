import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "./prisma.ts";

export const lucia = new Lucia(new PrismaAdapter(db.session, db.user), {
  getSessionAttributes: async (att) => {
    return {
      id: att?.id,
    };
  },
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      role: attributes.role,
      email: attributes.email,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: string;
      email: string;
      role: string;
    };
  }
}
