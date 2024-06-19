import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/editProfile')({
  component: () => <div>Hello /_user/editProfile!</div>
})