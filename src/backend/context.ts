import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { prisma } from "@/backend/utils/prisma";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  /**
   * Uses faster "getServerSession" in next-auth v4 that avoids a fetch request to /api/auth.
   * This function also updates the session cookie whereas getSession does not
   * Note: If no req -> SSG is being used -> no session exists (null)
   * @link https://github.com/nextauthjs/next-auth/issues/1535
   */

  // for API-response caching see https://trpc.io/docs/caching
  return {
    req,
    res,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
