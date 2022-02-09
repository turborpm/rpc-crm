// utils/trpc.ts
import { AppRouter } from "@/backend/routers/index";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
