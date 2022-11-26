import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { exampleRouter } from "./example";
import { transactionsRouter } from "./transactions";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  transactions: transactionsRouter,
  category : categoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
