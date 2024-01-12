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
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const loggedIn = useAppSelector((state) => Boolean(state.user.id))
  const administrator = useAppSelector((state) => state.user.administrator)

  const item = useAppSelector((state) => state.itemDetails)

  useEffect(() => {
    if (id) {
      dispatch({ type: 'itemDetails/fetch', payload: id })
    }
    return () => {
      dispatch({ type: 'itemDetails/unset' })
    }
  }, [dispatch, id])

  return (
    <div className="container mt-8">
      <TypographyH1>
        {item.name} ({item.type?.name})
      </TypographyH1>
      <div className="mt-6 border-t">
        <dl className="divide-y">
          <DescriptionListItem label="Right Ascension">
            {item.right_ascension ? (
              <RightAscensionTeX rightAscension={item.right_ascension} />
            ) : (
              'N/A'
            )}
          </DescriptionListItem>
          <DescriptionListItem label="Declination">
            {item.declination ? (
              <DeclinationTeX declination={item.declination} />
            ) : (
              'N/A'
            )}
          </DescriptionListItem>
          <DescriptionListItem label="Distance">
            {item.distance ? <DistanceTeX distance={item.distance} /> : 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Apparent Magnitude">
            {item.apparent_magnitude || 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Absolute Magnitude">
            {item.absolute_magnitude || 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Mass">
            {item.mass ? <MassTeX mass={item.mass} /> : 'N/A'}
          </DescriptionListItem>
          <DescriptionListItem label="Redshift">
            {item.redshift || 'N/A'}
          </DescriptionListItem>
        </dl>
      </div>
      {loggedIn &&
        (item.saved ? (
          <Button
            onClick={() =>
              dispatch({ type: 'api/unsaveItem', payload: item.id })
            }
          >
            Unsave
          </Button>
        ) : (
          <Button
            onClick={() => dispatch({ type: 'api/saveItem', payload: item.id })}
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
              payload: { id: item.id },
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
