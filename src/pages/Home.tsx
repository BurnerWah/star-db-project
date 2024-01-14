import { ItemTable } from '@/layouts/item-table'

export const Component = () => {
  return <ItemTable action={{ type: 'listItems/fetch' }} />
}
Component.displayName = 'HomePage'
