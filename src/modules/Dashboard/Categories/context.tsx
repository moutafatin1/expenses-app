import type { Category } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type UpdateCategoryDialog = {
  close: () => void;
  openUpdateDialog: (category: Category) => void;
  isOpen: boolean;
  category?: Category;
};

export const CategoryFormContext = createContext<UpdateCategoryDialog | null>(
  null
);

type UpdateCategoryDialogProviderProps = {
  children: React.ReactNode;
};

export const UpdateCategoryDialogProvider = ({
  children,
}: UpdateCategoryDialogProviderProps) => {
  const [category, setCategory] = useState<Category>();
  const close = () => {
    setCategory(undefined);
  };

  const openUpdateDialog = (category: Category) => {
    setCategory(category);
  };

  const isOpen = category !== undefined;

  return (
    <CategoryFormContext.Provider
      value={{
        close,
        isOpen,
        openUpdateDialog,
        category,
      }}
    >
      {children}
    </CategoryFormContext.Provider>
  );
};

export const useUpdateCategory = () => {
  const context = useContext(CategoryFormContext);
  if (context !== null) return context;
  throw new Error("context must not be null");
};
