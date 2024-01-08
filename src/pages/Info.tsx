import RequireAuth from '@/components/RequireAuth'

export default function Info() {
  return (
    <div className="container">
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
