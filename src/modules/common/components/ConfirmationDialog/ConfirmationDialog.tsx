import { fn } from "@utils/fn";
import { useCallback, useEffect, useState } from "react";
import { HiExclamationCircle, HiInformationCircle } from "react-icons/hi";
import Button from "../Elements/Button/Button";
import { Dialog, DialogPanel, DialogTitle } from "../Elements/Dialog/Dialog";

export type ConfirmationDialogProps = {
  triggerButton: (open: () => void) => React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: "danger" | "info";
  isDone?: boolean;
};

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = "",
  cancelButtonText = "Cancel",
  icon = "danger",
  isDone = false,
}: ConfirmationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);
  return (
    <>
      {triggerButton(open)}
      <Dialog isOpen={isOpen} onClose={close}>
        <DialogPanel className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 text-center">
          {icon === "danger" ? (
            <HiExclamationCircle className="mx-auto text-7xl text-red-400" />
          ) : (
            <HiInformationCircle className="mx-auto text-7xl text-blue-400" />
          )}

          <div>
            <DialogTitle className="pb-2 text-2xl font-bold text-gray-700">
              {title}
            </DialogTitle>
            <p className="text-gray-600">{body}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={close}
              className={fn(
                icon === "danger"
                  ? "border-red-400 text-red-400"
                  : "border-blue-400 text-blue-400"
              )}
              variant="outline"
            >
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};
