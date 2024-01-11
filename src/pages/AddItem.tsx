import { RequireAdmin } from '@/components/auth'
import { AddItemForm } from '@/components/forms/add-item'
import { TypographyH2 } from '@/components/typography'

export default function AddItem() {
  return (
    <div className="container mt-8">
      <TypographyH2>Add Item</TypographyH2>
      <AddItemForm />
    </div>
  )
}

// For lazy-loading
export function Component() {
  return (
    <RequireAdmin>
      <AddItem />
    </RequireAdmin>
  )
}

Component.displayName = 'LazyAddItem'
