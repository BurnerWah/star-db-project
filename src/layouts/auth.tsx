import jwstDeepField from '@/assets/images/jwst-deep-field.png?w=1200&format=webp'
import jwstDeepFieldsAvif from '@/assets/images/jwst-deep-field.png?w=500;700;900;1200&format=avif&as=srcset'
import jwstDeepFieldsJpeg from '@/assets/images/jwst-deep-field.png?w=500;700;900;1200&format=jpeg&as=srcset'
import jwstDeepFieldsWebp from '@/assets/images/jwst-deep-field.png?w=500;700;900;1200&format=webp&as=srcset'
import { buttonVariants } from '@/components/ui/use-button'
import { useAppDispatch } from '@/hooks/redux'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { Link, To } from 'react-router-dom'
import { AppTitle } from './common/app-title'

interface OtherPageInfo {
  to: To
  text: string
}

/**
 * Shared layout for login and registration pages.
 * Based on shadcn/ui's Authentication example, with some small changes like
 * adding the JWST deep field BG image and making the code more generic.
 * @see {@link https://ui.shadcn.com/examples/authentication shadcn/ui - Authentication example}
 * @see {@link https://github.com/shadcn-ui/ui/blob/main/apps/www/app/examples/authentication/page.tsx shadcn/ui - Authentication example source code}
 */
export function AuthLayout({
  otherPage,
  title,
  children,
}: Readonly<{
  otherPage: OtherPageInfo
  title: string
  children: JSX.Element
}>) {
  // Hide the header & footer while this layout is active, as they don't work
  // with the design
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: 'ui/header/hide' })
    dispatch({ type: 'ui/footer/hide' })
    return () => {
      dispatch({ type: 'ui/header/show' })
      dispatch({ type: 'ui/footer/show' })
    }
  }, [dispatch])

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
        <picture className="absolute inset-0">
          {/* AVIF conversion is very slow and should be avoided in development builds */}
          {import.meta.env.PROD && (
            <source srcSet={jwstDeepFieldsAvif} type="image/avif" />
          )}
          <source srcSet={jwstDeepFieldsWebp} type="image/webp" />
          <source srcSet={jwstDeepFieldsJpeg} type="image/jpeg" />
          <img src={jwstDeepField} alt="JWST Deep Field" />
        </picture>
        <AppTitle className="relative z-20 text-lg font-medium" />
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
