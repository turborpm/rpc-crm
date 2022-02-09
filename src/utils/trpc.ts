// utils/trpc.ts
import { AppRouter } from "@/backend/routers/index";
import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureOutput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
