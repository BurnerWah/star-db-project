import ItemList from '../components/ItemList'

export default function Listing() {
  return (
    <div className="container">
      <h2>Listing</h2>
      <ItemList action={{ type: 'listItems/fetch' }} />
    </div>
  )
}

// For lazy-loading
export const Component = Listing
