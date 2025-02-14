import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavigationBar } from "../components/ui/NavigationBar.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationBar />
      <div className="pt-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
