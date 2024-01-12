export default function About() {
  return (
    <article className="container prose prose-invert mt-8 lg:prose-xl prose-a:transition-colors">
      <h1>About</h1>
      <p>
        {`
        I've always found space fascinationg, but I feel like astronomy apps
        aren't really as focused on showing information about planets & stars as
        they are on rendering the sky. That's an important task, but sometimes I
        just want something a bit simpler. That's why I created this.
        `}
      </p>
      <h2>Tech Stack</h2>
      <p>
        This app is built with {A['React']}, and styled using{' '}
        {A['Tailwind CSS']}. The core design is based on {A['shadcn/ui']} &{' '}
        {A['Tailwind UI']}. Most icons are from {A['Lucide']}, with a few others
        from {A['Radix UI']}, which is also used under-the-hood in a lot of
        components.
      </p>
    </article>
  )
}

/**
 * Links included in the about page. With the hover classes, they're kinda
 * large in the source code, and it's preferable to keep the a bit more out ot
 * the way. The key should be the name of the text that should be displayed.
 */
const A = {
  React: (
    <a href="https://react.dev/" className="hover:bg-cyan-900">
      React
    </a>
  ),
  'Tailwind CSS': (
    <a href="https://tailwindcss.com/" className="hover:bg-sky-900">
      Tailwind CSS
    </a>
  ),
  'shadcn/ui': (
    <a href="https://ui.shadcn.com/" className="hover:bg-zinc-900">
      shadcn/ui
    </a>
  ),
  'Tailwind UI': (
    <a href="https://tailwindui.com/" className="hover:bg-sky-900">
      Tailwind UI
    </a>
  ),
  Lucide: (
    <a href="https://lucide.dev/" className="hover:bg-red-900">
      Lucide
    </a>
  ),
  'Radix UI': (
    <a href="https://www.radix-ui.com/" className="hover:bg-neutral-900">
      Radix UI
    </a>
  ),
} as const satisfies Record<string, JSX.Element>

// For lazy-loading
export const Component = About
