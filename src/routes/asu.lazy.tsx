import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/asu')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/asu"!</div>
}
