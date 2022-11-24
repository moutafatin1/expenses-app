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
      const expenses = await ctx.prisma.transaction.findMany({
        where: {
          type: "expense",
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      const expenseData: LineChartData = {
        id: "expense",
        data: [],
      };

      expenses.map((e) => {
        expenseData.data.push({
          x: e.createdAt.toISOString().split("T")[0],
          y: e.amount,
        });
      });

      const incomes = await ctx.prisma.transaction.findMany({
        where: {
          type: "income",
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const incomeData: LineChartData = {
        id: "income",
        data: [],
      };

      incomes.map((e) => {
        incomeData.data.push({
          x: e.createdAt.toISOString().split("T")[0],
          y: e.amount,
        });
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
    x?: string;
    y: number;
  }>;
};
