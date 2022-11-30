import { StatsCard } from "@modules/common/components/Cards/StatsCard";
import { Spinner } from "@modules/common/components/Elements";
import { trpc } from "@utils/trpc";
import { GiExpense, GiTakeMyMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";

export const UserStats = () => {
  const { data, isError, isLoading } = trpc.user.getStats.useQuery();

  if (isError) return <p>error...</p>;
  if (isLoading)
    return (
      <Spinner
        show={isLoading}
        delay={400}
        className="mx-auto text-7xl text-purple-500"
      />
    );
  return (
    <div className="flex flex-wrap gap-4">
      <StatsCard
        title="Total Income"
        amount={data.totalIncome}
        color="pink"
        icon={<GiTakeMyMoney />}
      />
      <StatsCard
        title="Total Expense"
        amount={data.totalExpense}
        color="green"
        icon={<GiExpense />}
      />
      <StatsCard
        title="Balance"
        amount={data.balance}
        color="blue"
        icon={<RiBankCardFill />}
      />
    </div>
  );
};
