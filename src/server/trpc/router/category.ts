import { newCategorySchema } from "../../../components/Dashboard/Categories/AddNewCategoryForm";
import { protectedProcedure, router } from "../trpc";

export const categoryRouter = router({
  getCategories: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  createNewCategory: protectedProcedure
    .input(newCategorySchema)
    .mutation(async ({ ctx, input: { categoryName: name, emoji } }) => {
      return ctx.prisma.category.create({
        data: {
          name,
          emoji,
          userId: ctx.session.user.id,
        },
      });
    }),
});
