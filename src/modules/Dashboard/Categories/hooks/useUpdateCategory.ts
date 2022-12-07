import type { Category } from "@prisma/client";
import { useState } from "react";

export const useUpdateCategory = () => {
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category>();
  const closeUpdateDialog = () => {
    setCategoryToUpdate(undefined);
  };
  const openUpdateDialog = (category: Category) => {
    setCategoryToUpdate(category);
  };
  const updateDialogIsOpen = categoryToUpdate !== undefined;

  return {
    categoryToUpdate,
    closeUpdateDialog,
    openUpdateDialog,
    updateDialogIsOpen,
  };
};

export const useUpdateDialog =<T> () => {
  const [dataToUpdate, setDataToUpdate] = useState<T>();
  const closeUpdateDialog = () => {
    setDataToUpdate(undefined);
  };
  const openUpdateDialog = (data: T) => {
    setDataToUpdate(data);
  };
  const updateDialogIsOpen = dataToUpdate !== undefined;

  return {
    dataToUpdate,
    closeUpdateDialog,
    openUpdateDialog,
    updateDialogIsOpen,
  };
};

