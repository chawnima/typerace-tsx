import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/multiplayer/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/multiplayer/$id"!</div>
}
