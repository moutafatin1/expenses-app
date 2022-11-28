import { categoryFormSchema } from "@modules/Dashboard/Categories/categorySchema";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const categoryRouter = router({
  getCategories: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  createNewCategory: protectedProcedure
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
