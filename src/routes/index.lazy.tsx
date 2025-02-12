import { createLazyFileRoute } from "@tanstack/react-router";
import {Game, GameTips} from "../components/Game";
import { Leaderboard } from "../components/Leaderboard";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 w-full max-w-5xl mx-auto flex flex-col justify-center">
      {/* game and leaderboard */}
      <div className="flex flex-col lg:flex-row h-fit min-h-96 gap-16 items-center">
        <div className="flex flex-col justify-center h-full w-full lg:w-2/3 gap-8">
          <Game />
          <GameTips />
        </div>
        <div className="w-full lg:w-1/3 h-full">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
