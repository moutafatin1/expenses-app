import { protectedProcedure, router } from "../trpc";

export const transactionsRouter = router({
  getExpensesByCategory: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.category.findMany({
      select: {
        name: true,
        id: true,
        Transaction: {
          select: {
            amount: true,
          },
          where: {
            type: "expense",
          },
        },
      },
    });
    const expensesByCategory = data.map((cat) => {
      return {
        id: cat.name,
        label: cat.name,
        value: cat.Transaction.reduce((acc, b) => acc + b.amount, 0),
      };
    });

    return expensesByCategory;
  }),
});
