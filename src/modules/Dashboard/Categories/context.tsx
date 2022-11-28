import { createContext, useContext, useState } from "react";

export type FormMode = {
  mode?: "add" | "update";
  id?: string;
};

type CategoryFormContextType = {
  closeForm: () => void;
  openAddForm: () => void;
  openUpdateForm: (id: string) => void;
  isAddMode: boolean;
  isUpdateMode: boolean;
  categoryId? : string
};

export const CategoryFormContext =
  createContext<CategoryFormContextType | null>(null);

type CategoryFormProviderProps = {
  children: React.ReactNode;
};

export const CategoryFormProvider = ({
  children,
}: CategoryFormProviderProps) => {
  const [formMode, setFormMode] = useState<FormMode>();
  const closeForm = () => {
    setFormMode(undefined);
  };
  const openAddForm = () => {
    setFormMode({ mode: "add" });
  };
  const openUpdateForm = (id: string) => {
    setFormMode({ mode: "update", id });
  };
  const isAddMode = formMode?.mode === "add";
  const isUpdateMode = formMode?.mode === "update";
  const categoryId = formMode?.id

  return (
    <CategoryFormContext.Provider
      value={{
        closeForm,
        openAddForm,
        openUpdateForm,
        isAddMode,
        isUpdateMode,
        categoryId
      }}
    >
      {children}
    </CategoryFormContext.Provider>
  );
};

export const useCategoryFormContext = () => {
  const context = useContext(CategoryFormContext);
  if (context !== null) return context;
  throw new Error("context must not be null");
};
