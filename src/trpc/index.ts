import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";

export const appRouter = router({
  test: publicProcedure.query(() => {
    return { a: 1 };
  }),
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

 

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
