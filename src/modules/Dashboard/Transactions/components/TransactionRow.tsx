import type { Transaction } from "@prisma/client";
import { HiPencil } from "react-icons/hi";
import { DeleteTransaction } from "./DeleteTransaction";
import type { TransactionFormData } from "./TransactionBaseForm";

type TransactionRowProps = {
  transaction: Transaction & {
    category: {
      name: string;
      emoji: string;
    };
  };
  openUpdateDialog: (data: TransactionFormData) => void;
};

export const TransactionRow = ({
  transaction,
  openUpdateDialog,
}: TransactionRowProps) => {
  return (
    <tr>
      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-3xl font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 sm:text-4xl">
        {transaction.category.emoji}
        <span className="hidden md:inline">{transaction.category.name}</span>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {transaction.type}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {transaction.amount}
      </td>

      <td className="flex  items-center justify-end gap-2 py-4 pl-3  pr-4 sm:pr-6">
        <button
          onClick={() =>
            openUpdateDialog({
              amount: transaction.amount.toString(),
              type: transaction.type,
              category: transaction.category,
              id: transaction.id
            })
          }
          className="rounded-full bg-sky-400 p-2 text-xl text-white transition-opacity hover:opacity-75"
        >
          <HiPencil />
        </button>
        <DeleteTransaction id={transaction.id} />
      </td>
    </tr>
  );
};
