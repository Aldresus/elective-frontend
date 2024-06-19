import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/user/$id')({
  component: () => <div>Hello /_user/user/$id!</div>
})