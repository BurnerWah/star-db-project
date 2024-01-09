import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate, type NavigateOptions, type To } from 'react-router-dom'

export default function Command() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  useHotkeys(['meta+j', 'ctrl+j'], (e) => {
    e.preventDefault()
    setOpen(true)
  })

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
