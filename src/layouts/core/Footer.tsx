import { memo } from 'react'

const Footer = memo(() => (
  <footer className="py-6">
    <div className="container">
      <p className="text-balance text-center text-sm text-muted-foreground">
        &copy; Jaden Pleasants
      </p>
    </div>
  </footer>
))

Footer.displayName = 'Core.Footer'

export default Footer
