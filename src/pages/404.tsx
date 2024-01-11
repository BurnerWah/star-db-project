import { buttonVariants } from '@/components/ui/use-button'
import { Link } from 'react-router-dom'

// Based on tailwind UI
// https://tailwindui.com/components/marketing/feedback/404-pages
export const Component = () => {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-secondary-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className={buttonVariants({ variant: 'default' })}>
            Go back home
          </Link>
          {/* <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </div>
  )
}

Component.displayName = '404Page'
