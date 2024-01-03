import ItemList from '../../components/ItemList'

export default function Saved() {
  return (
    <div className="container">
      <h2>Listing</h2>
      <ItemList action={{ type: 'api/listSavedItems' }} />
    </div>
  )
}
