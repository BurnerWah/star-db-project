import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

export default function Listing() {
  const dispatch = useAppDispatch()
  const listItems = useAppSelector((state) => state.listItems)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'LIST_ITEMS::FETCH' })
  }, [dispatch])

  return (
    <div className="container">
      <h2>Listing</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Right Ascension</th>
            <th>Declination</th>
            <th>Distance</th>
            <th>App. Magnitude</th>
            <th>Abs. Magnitude</th>
            <th>Mass</th>
            <th>Redshift</th>
          </tr>
        </thead>
        <tbody>
          {listItems.map((item) => (
            <tr key={item.id} onClick={() => navigate(`/details/${item.id}`)}>
              <td>{item.name}</td>
              <td>{item.type.name}</td>
              <td>{item.right_ascension}</td>
              <td>
                {item.declination &&
                  `${item.declination.sign * item.declination.degrees}° ${
                    item.declination.arcmin
                  }' ${item.declination.arcsec}"`}
              </td>
              <td>
                {item.distance &&
                  `${item.distance.value}±${item.distance.error} Ly`}
              </td>
              <td>{item.apparent_magnitude}</td>
              <td>{item.absolute_magnitude}</td>
              <td>{item.mass}</td>
              <td>{item.redshift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
