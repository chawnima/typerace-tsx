import { useQuery } from "@tanstack/react-query";
import { getSingleRank } from "../services/rank";
import { Table } from "./ui/Table";

export const Leaderboard = () => {
  const {
    data: rankList,
    isPending,
    isSuccess,
  } = useQuery({ queryKey: ["singleRank"], queryFn: getSingleRank });

  return (
    <div>
      <h1 className="text-center text-xl">Leaderboard</h1>
      {isPending && <p>Loading...</p>}
      {isSuccess ? (
        <Table content={rankList?.data} />
      ) : (
        <span>Failed to load rank data</span>
      )}
    </div>
  );
};
