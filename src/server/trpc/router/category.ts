import { categoryFormSchema } from "@modules/Dashboard/Categories/categorySchema";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const categoryRouter = router({
  all: protectedProcedure
    .input(
      z
        .object({
          page: z.number().optional(),
          searchTerm: z.string().optional(),
          sort: z.union([z.literal("usage"), z.literal("new")]).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const size = 5;
      const page = input?.page ?? 1;
      const totalCategories = await ctx.prisma.category.count();
      const totalPages = Math.ceil(totalCategories / size);
      const hasMore = totalPages > page;
      const categories = await ctx.prisma.category.findMany({
        take: size,
        skip: (page - 1) * size,
        where: {
          name: {
            contains: input?.searchTerm,
          },
        },
        orderBy: {
          createdAt: input?.sort === "new" ? "desc" : undefined,
          ...(input?.sort === "usage" && {
            Transaction: {
              _count: "desc",
            },
          }),
        },
      });
      return { categories, hasMore, totalRowCount: totalCategories, size };
    }),
  new: protectedProcedure
    .input(categoryFormSchema)
    .mutation(({ ctx, input: { categoryName: name, emoji } }) => {
      return ctx.prisma.category.create({
        data: {
          name,
          emoji,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        categoryName: z.string().min(1, "Category name is required"),
        emoji: z.string().min(1, "Emoji is required"),
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.update({
        data: {
          name: input.categoryName,
          emoji: input.emoji,
        },
        where: {
          id: input.id,
        },
      });
    }),
  deleteById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.delete({
        where: {
          id: input,
        },
      });
    }),
  byId: protectedProcedure
    .input(z.string().optional())
    .query(({ ctx, input }) => {
      return ctx.prisma.category.findUnique({
        where: {
          id: input,
        },
      });
    }),
});
