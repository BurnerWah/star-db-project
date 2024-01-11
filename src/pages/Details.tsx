import {
  DeclinationTeX,
  DistanceTeX,
  MassTeX,
  RightAscensionTeX,
} from '@/components/formatters'
import { TypographyH1 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useEffect, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

// Based loosely off of https://tailwindui.com/components/application-ui/data-display/description-lists
export default function Details() {
  const { id: pageId } = useParams()

  const dispatch = useAppDispatch()

  const loggedIn = useAppSelector((state) => Boolean(state.user.id))
  const administrator = useAppSelector((state) => state.user.administrator)

  const id = useAppSelector((state) => state.itemDetails.id)
  const name = useAppSelector((state) => state.itemDetails.name)
  const type = useAppSelector((state) => state.itemDetails.type?.name)
  const ra = useAppSelector((state) => state.itemDetails.right_ascension)
  const declination = useAppSelector((state) => state.itemDetails.declination)
  const distance = useAppSelector((state) => state.itemDetails.distance)
  const apparentMagnitude = useAppSelector(
    (state) => state.itemDetails.apparent_magnitude,
  )
  const absoluteMagnitude = useAppSelector(
    (state) => state.itemDetails.absolute_magnitude,
  )
  const mass = useAppSelector((state) => state.itemDetails.mass)
  const redshift = useAppSelector((state) => state.itemDetails.redshift)
  const saved = useAppSelector((state) => state.itemDetails.saved)

  useEffect(() => {
    if (pageId) {
      dispatch({ type: 'itemDetails/fetch', payload: pageId })
    }
    return () => {
      dispatch({ type: 'itemDetails/unset' })
    }
  }, [dispatch, pageId])

  return (
    <div className="container mt-8">
      <TypographyH1>
        {name} ({type})
      </TypographyH1>
      <div className="mt-6 border-t">
        <dl className="divide-y">
          <DescriptionListItem label="Right Ascension">
            {ra ? <RightAscensionTeX rightAscension={ra} /> : 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Declination">
            {declination ? <DeclinationTeX declination={declination} /> : 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Distance">
            {distance ? <DistanceTeX distance={distance} /> : 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Apparent Magnitude">
            {apparentMagnitude || 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Absolute Magnitude">
            {absoluteMagnitude || 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Mass">
            {mass ? <MassTeX mass={mass} /> : 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Redshift">
            {redshift || 'N/A'}
          </DescriptionListItem>
        </dl>
      </div>
      {loggedIn &&
        (saved ? (
          <Button
            onClick={() => dispatch({ type: 'api/unsaveItem', payload: id })}
          >
            Unsave
          </Button>
        ) : (
          <Button
            onClick={() => dispatch({ type: 'api/saveItem', payload: id })}
          >
            Save
          </Button>
        ))}
      {administrator && (
        <Button
          variant="destructive"
          onClick={() =>
            dispatch({
              type: 'api/admin/deleteItem',
              payload: { id },
            })
          }
        >
          Delete
        </Button>
      )}
    </div>
  )
}

function DescriptionListItem({
  label,
  children,
}: Readonly<{ label: ReactNode; children: ReactNode }>) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6">{label}</dt>
      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
        {children}
      </dd>
    </div>
  )
}

// For lazy-loading
export const Component = Details
