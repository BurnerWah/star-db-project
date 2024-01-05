// These components are most of the typography components from Shadcn UI.
// They're all described here: https://ui.shadcn.com/docs/components/typography
// I didn't include the table because it'd be too complicated to include.

// All of these components have the same props
type TypographyProps = Readonly<{
  children?: JSX.Element | string | JSX.Element[] | string[]
}>

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#h1 Shadcn Typography - h1}
 */
export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#h2 Shadcn Typography - h2}
 */
export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  )
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#h3 Shadcn Typography - h3}
 */
export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#h4 Shadcn Typography - h4}
 */
export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#p Shadcn Typography - p}
 */
export function TypographyP({ children }: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#blockquote Shadcn Typography - blockquote}
 */
export function TypographyBlockquote({ children }: TypographyProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#list Shadcn Typography - list}
 */
export function TypographyList({ children }: TypographyProps) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#inline-code Shadcn Typography - Inline code}
 */
export function TypographyInlineCode({ children }: TypographyProps) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#lead Shadcn Typography - Lead}
 */
export function TypographyLead({ children }: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#large Shadcn Typography - Large}
 */
export function TypographyLarge({ children }: TypographyProps) {
  return <div className="text-lg font-semibold">{children}</div>
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#small Shadcn Typography - Small}
 */
export function TypographySmall({ children }: TypographyProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>
}

/**
 * @see {@link https://ui.shadcn.com/docs/components/typography#muted Shadcn Typography - Muted}
 */
export function TypographyMuted({ children }: TypographyProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
