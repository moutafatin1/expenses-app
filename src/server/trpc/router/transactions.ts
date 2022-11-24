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
            userId: ctx.session.user.id,
            type: "expense",
          },
        },
      },
    });
    const totalExpensesByCategory = data.map((cat) => {
      return {
        id: cat.name,
        label: cat.name,
        value: cat.Transaction.reduce((acc, b) => acc + b.amount, 0),
      };
    });

    return totalExpensesByCategory;
  }),

  getIncomeAndExpensesChartLineData: protectedProcedure.query(
    async ({ ctx }) => {
      const transactions = await ctx.prisma.transaction.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
      const expenseData: LineChartData = {
        id: "expense",
        data: [],
      };
      const incomeData: LineChartData = {
        id: "income",
        data: [],
      };

      transactions.map((t) => {
        const newPoint: LineChartData["data"][0] = {
          x: t.createdAt.toISOString().split("T")[0] ?? null,
          y: t.amount,
        };
        if (t.type === "expense") {
          expenseData.data.push(newPoint);
        } else {
          incomeData.data.push(newPoint);
        }
      });

      return [expenseData, incomeData];
    }
  ),
  getLatestTransactions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
      take: 5,
    });
  }),
});

type LineChartData = {
  id: string;
  data: Array<{
    x: string | null;
    y: number;
  }>;
};
