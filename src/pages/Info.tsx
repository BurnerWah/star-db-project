import { RequireAuth } from '@/components/auth'

export default function Info() {
  return (
    <div>
      <p>Info Page</p>
    </div>
  )
}

export function Component() {
  return (
    <RequireAuth>
      <Info />
    </RequireAuth>
  )
}

Component.displayName = 'LazyInfo'
