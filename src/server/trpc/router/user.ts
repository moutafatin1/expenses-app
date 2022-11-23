import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const incomeAggregation = await ctx.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: ctx.session.user.id,
        type: "income",
      },
    });

    const expenseAggregation = await ctx.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: ctx.session.user.id,
        type: "expense",
      },
    });

    const totalIncome = incomeAggregation._sum.amount ?? 0;
    const totalExpense = expenseAggregation._sum.amount ?? 0;
    const balance = totalIncome - totalExpense;

    return { totalExpense, totalIncome, balance };
  }),
});
