import { ItemTable } from '@/layouts/item-table'

export const Component = () => (
  <ItemTable action={{ type: 'listItems/fetch' }} />
)

Component.displayName = 'HomePage'
