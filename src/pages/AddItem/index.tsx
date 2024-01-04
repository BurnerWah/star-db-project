import { FormEventHandler, useState } from 'react'
import { MeasurementWithUncertainty } from '~typings/structs'

export default function AddItem() {
  const [name, setName] = useState('')
  const [type, setType] = useState('1')
  // I generally don't like multi-value states, but in this case it's a lot
  // easier than having 6 separate number states and setters. I might change it
  // to separate states later on though.
  const [rightAscension, setRightAscension] = useState<{
    hours?: number
    min?: number
    sec?: number
  }>({})
  const [declination, setDeclination] = useState<{
    deg?: number
    min?: number
    sec?: number
  }>({})
  const [distance, setDistance] = useState<MeasurementWithUncertainty>({
    value: 0,
    error: 0,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('rightAscension', rightAscension)
    console.log('declination', declination)
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
            onChange={(e) => setType(e.target.value)}
          >
            {/* This is hardcoded for now */}
            <option value="1">Star</option>
            <option value="2">Planet</option>
            <option value="3">Galaxy</option>
            <option value="4">Nebula</option>
            <option value="5">Cluster</option>
            <option value="6">Black Hole</option>
          </select>
        </label>
        <br />
        <label>
          Right Ascension:{' '}
          <input
            type="number"
            name="hours"
            value={rightAscension.hours ?? 0}
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
            value={rightAscension.min ?? 0}
            onChange={(e) =>
              setRightAscension((r) => ({ ...r, min: e.target.valueAsNumber }))
            }
          />
          m{' '}
          <input
            type="number"
            name="seconds"
            value={rightAscension.sec ?? 0}
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
            value={declination.deg ?? 0}
            onChange={(e) =>
              setDeclination((d) => ({ ...d, deg: e.target.valueAsNumber }))
            }
          />
          {'° '}
          <input
            type="number"
            name="arcmin"
            value={declination.min ?? 0}
            onChange={(e) =>
              setDeclination((d) => ({ ...d, min: e.target.valueAsNumber }))
            }
          />
          {"' "}
          <input
            type="number"
            name="arcsec"
            value={declination.sec ?? 0}
            onChange={(e) =>
              setDeclination((d) => ({ ...d, sec: e.target.valueAsNumber }))
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

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
