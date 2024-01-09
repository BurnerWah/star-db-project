import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link, To } from 'react-router-dom'

interface OtherPageInfo {
  to: To
  text: string
}

export function AuthLayout({
  otherPage,
  title,
  children,
}: Readonly<{
  otherPage: OtherPageInfo
  title: string
  children: JSX.Element
}>) {
  return (
    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to={otherPage.to}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        {otherPage.text}
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className={cn('absolute inset-0', 'bg-jwst-deep-field')} />
        <div className="relative z-20 flex items-center text-lg font-medium">
          StarForge
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {"Webb's First Deep Field (NIRCam Image)"}
            </p>
            <footer className="text-sm">
              Credits:{' '}
              <a href="https://webbtelescope.org/contents/media/images/2022/035/01G7DCWB7137MYJ05CSH1Q5Z1Z">
                NASA, ESA, CSA, STScI
              </a>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
