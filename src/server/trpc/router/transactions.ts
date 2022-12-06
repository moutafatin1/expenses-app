import { TRPCError } from "@trpc/server";
import { z } from "zod";
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
        // where: {
        //   createdAt: {
        //     gte: subtractWeeks(1),
        //   },
        // },
      });
      console.log(
        "🚀 ~ file: transactions.ts:43 ~ transactions",
        transactions.length
      );
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
      console.log(expenseData.data, incomeData.data);
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
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        category: {
          select: {
            name: true,
            emoji: true,
          },
        },
      },
    });
  }),
  deleteById: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transaction.delete({
        where: {
          id: input,
        },
      });
    }),
  new: protectedProcedure
    .input(
      z.object({
        categoryId: z.string().optional(),
        type: z.union([z.literal("expense"), z.literal("income")]),
        amount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findUnique({
        where: {
          id: input.categoryId,
        },
      });

      if (!category || !input.categoryId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }
      return ctx.prisma.transaction.create({
        data: {
          userId: ctx.session.user.id,
          categoryId: input.categoryId,
          type: input.type,
          amount: parseFloat(input.amount),
        },
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
