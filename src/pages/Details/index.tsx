import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

export default function Details() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const itemDetails = useAppSelector((state) => state.itemDetails)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (id) {
      dispatch({ type: 'itemDetails/fetch', payload: id })
    }
    return () => {
      dispatch({ type: 'itemDetails/unset' })
    }
  }, [dispatch, id])

  return (
    <div className="container">
      <h2>Details for item {id}</h2>
      {/* I don't wanna format this right now, I just want to validate that it works */}
      <pre>{JSON.stringify(itemDetails, null, 2)}</pre>
      {user.id && (
        <button
          onClick={() =>
            dispatch({ type: 'api/saveItem', payload: itemDetails.id })
          }
        >
          Save
        </button>
      )}
      {user.administrator && (
        <button
          onClick={() =>
            dispatch({
              type: 'api/admin/deleteItem',
              payload: { id: itemDetails.id },
            })
          }
        >
          Delete
        </button>
      )}
    </div>
  )
}

// For lazy-loading
export const Component = Details
