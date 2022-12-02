import type { StatsCardType } from "@modules/common/components/Cards/StatsCard";
import { StatsCard } from "@modules/common/components/Cards/StatsCard";
import { Spinner } from "@modules/common/components/Elements";
import { trpc } from "@utils/trpc";

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
      {data.map((stat) => (
        <StatsCard
          key={stat.type}
          title={stat.title}
          amount={stat.amount}
          variant={stat.type as StatsCardType}
        />
      ))}
    </div>
  );
};
