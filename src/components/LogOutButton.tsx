import { useAppDispatch } from '../hooks/redux'

function LogOutButton({ className }: Readonly<{ className?: string }>) {
  const dispatch = useAppDispatch()

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={className}
      onClick={() => dispatch({ type: 'api/auth/logout' })}
    >
      Log Out
    </button>
  )
}

export default LogOutButton
