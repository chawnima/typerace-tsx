import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Game from "../components/Game";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  return (
    <div className="p-2 w-full max-w-5xl mx-auto flex flex-col justify-center">
      {/* game and leaderboard */}
      <div className="flex flex-col lg:flex-row h-96">
        <Game />
        <div className="w-full lg:w-1/3">
          <h1 className="text-center text-xl border-b">Leaderboard</h1>
        </div>
      </div>
    </div>
  );
}
