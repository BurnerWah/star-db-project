import { TypographyH2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

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
    <div>
      <TypographyH2>{itemDetails.name}</TypographyH2>
      {/* I don't wanna format this right now, I just want to validate that it works */}
      <pre>{JSON.stringify(itemDetails, null, 2)}</pre>
      {user.id &&
        (itemDetails.saved ? (
          <Button
            onClick={() =>
              dispatch({ type: 'api/unsaveItem', payload: itemDetails.id })
            }
          >
            Unsave
          </Button>
        ) : (
          <Button
            onClick={() =>
              dispatch({ type: 'api/saveItem', payload: itemDetails.id })
            }
          >
            Save
          </Button>
        ))}
      {user.administrator && (
        <Button
          variant="destructive"
          onClick={() =>
            dispatch({
              type: 'api/admin/deleteItem',
              payload: { id: itemDetails.id },
            })
          }
        >
          Delete
        </Button>
      )}
    </div>
  )
}

// For lazy-loading
export const Component = Details
