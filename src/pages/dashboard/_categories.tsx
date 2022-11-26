import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/Elements/Button/Button";
import { InputField } from "../../components/Forms";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const categoryFormSchema = z.object({
  name: z.string().min(5, "Category name must be at least 5 characters long"),
  emoji: z
    .string()
    .min(2, "Emoji is required")
    .max(2, "Only 1 emoji is required"),
});

type FormData = z.infer<typeof categoryFormSchema>;

const CategoriesPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(categoryFormSchema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log("🚀 ~ file: categories.tsx ~ line 19 ~ onSubmit ~ data", data);
  });
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto  max-w-md rounded-lg bg-white p-8">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <InputField
            errorMessage={errors?.name?.message}
            label="Name"
            placeholder="Category name..."
            {...register("name")}
          />
          <InputField
            errorMessage={errors?.emoji?.message}
            label="Emoji"
            placeholder="Category emoji... 📽️"
            {...register("emoji")}
          />
          <Button>Add new Category</Button>
        </form>
      </div>
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};
