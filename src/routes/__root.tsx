import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "../components/ui/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="pt-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
