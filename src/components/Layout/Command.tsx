import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom'

export default function Command() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const goToPage = (to: To, options?: NavigateOptions) => {
    setOpen(false)
    navigate(to, options)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup title="Pages">
          <CommandItem onSelect={() => goToPage('/list')}>List</CommandItem>
          <CommandItem onSelect={() => goToPage('/about')}>About</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
