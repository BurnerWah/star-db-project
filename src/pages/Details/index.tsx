import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

export default function Details() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const itemDetails = useAppSelector((state) => state.itemDetails)

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
    </div>
  )
}
