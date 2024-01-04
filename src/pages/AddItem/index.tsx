import { FormEventHandler, useState } from 'react'
import {
  DeclinationInput,
  DistanceInput,
  RightAscensionInput,
} from '~typings/inputs'
import { EDBObjectTypes } from '~typings/tables'
import { useAppDispatch } from '../../hooks/redux'

export default function AddItem() {
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>()
  const [type, setType] = useState<EDBObjectTypes>(EDBObjectTypes.Star)
  // I generally don't like multi-value states, but in this case it's a lot
  // easier than having 6 separate number states and setters. I might change it
  // to separate states later on though.
  const [rightAscension, setRightAscension] = useState<RightAscensionInput>({})
  const [declination, setDeclination] = useState<DeclinationInput>({})
  const [distance, setDistance] = useState<DistanceInput>({})
  const [apparentMagnitude, setApparentMagnitude] = useState<number>()
  const [absoluteMagnitude, setAbsoluteMagnitude] = useState<number>()
  const [mass, setMass] = useState<number>()
  const [redshift, setRedshift] = useState<number>()
  const [nasaId, setNasaId] = useState<string>()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!name) return
    dispatch({
      type: 'api/admin/addItem',
      payload: {
        name,
        type,
        right_ascension: rightAscension,
        declination,
        distance,
        apparent_magnitude: apparentMagnitude,
        absolute_magnitude: absoluteMagnitude,
        mass,
        redshift,
        nasa_image_id: nasaId,
      },
    })
  }

  return (
    <div className="container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{' '}
          <input
            type="text"
            name="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Type:{' '}
          <select
            name="Type"
            required
            value={type}
            onChange={(e) => setType(parseInt(e.target.value))}
          >
            {/* This is hardcoded for now */}
            <option value={EDBObjectTypes.Star}>Star</option>
            <option value={EDBObjectTypes.Planet}>Planet</option>
            <option value={EDBObjectTypes.Galaxy}>Galaxy</option>
            <option value={EDBObjectTypes.Nebula}>Nebula</option>
            <option value={EDBObjectTypes.Cluster}>Cluster</option>
            <option value={EDBObjectTypes['Black Hole']}>Black Hole</option>
          </select>
        </label>
        <br />
        <label>
          Right Ascension:{' '}
          <input
            type="number"
            name="hours"
            value={rightAscension.hours}
            onChange={(e) =>
              setRightAscension((r) => ({
                ...r,
                hours: e.target.valueAsNumber,
              }))
            }
          />
          h{' '}
          <input
            type="number"
            name="minutes"
            value={rightAscension.min}
            onChange={(e) =>
              setRightAscension((r) => ({ ...r, min: e.target.valueAsNumber }))
            }
          />
          m{' '}
          <input
            type="number"
            name="seconds"
            value={rightAscension.sec}
            onChange={(e) =>
              setRightAscension((r) => ({ ...r, sec: e.target.valueAsNumber }))
            }
          />
          {'s'}
        </label>
        <br />
        <label>
          Declination:{' '}
          <input
            type="number"
            name="degrees"
            value={declination.degrees}
            onChange={(e) =>
              setDeclination((d) => ({ ...d, degrees: e.target.valueAsNumber }))
            }
          />
          {'° '}
          <input
            type="number"
            name="arcmin"
            value={declination.arcmin}
            onChange={(e) =>
              setDeclination((d) => ({ ...d, arcmin: e.target.valueAsNumber }))
            }
          />
          {"' "}
          <input
            type="number"
            name="arcsec"
            value={declination.arcsec}
            onChange={(e) =>
              setDeclination((d) => ({ ...d, arcsec: e.target.valueAsNumber }))
            }
          />
          {'"'}
        </label>
        <br />
        <label>
          Distance:{' '}
          <input
            type="number"
            name="distance"
            value={distance.value}
            onChange={(e) =>
              setDistance((d) => ({ ...d, value: e.target.valueAsNumber }))
            }
          />
          {'±'}
          <input
            type="number"
            name="error"
            value={distance.error}
            onChange={(e) =>
              setDistance((d) => ({ ...d, error: e.target.valueAsNumber }))
            }
          />
        </label>
        <br />
        <label>
          Apparent Magnitude:{' '}
          <input
            type="number"
            name="apparentMagnitude"
            value={apparentMagnitude}
            onChange={(e) => setApparentMagnitude(e.target.valueAsNumber)}
          />
        </label>
        <label>
          Absolute Magnitude:{' '}
          <input
            type="number"
            name="absoluteMagnitude"
            value={absoluteMagnitude}
            onChange={(e) => setAbsoluteMagnitude(e.target.valueAsNumber)}
          />
        </label>
        <br />
        <label>
          Mass:{' '}
          <input
            type="number"
            name="mass"
            value={mass}
            onChange={(e) => setMass(e.target.valueAsNumber)}
          />
        </label>
        <br />
        <label>
          Redshift:{' '}
          <input
            type="number"
            name="redshift"
            value={redshift}
            onChange={(e) => setRedshift(e.target.valueAsNumber)}
          />
        </label>
        <br />
        <label>
          NASA ID:{' '}
          <input
            type="text"
            name="nasaId"
            value={nasaId}
            onChange={(e) => setNasaId(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
