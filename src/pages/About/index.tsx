import {
  Express,
  KaTeX,
  Lucide,
  Node,
  PostgreSQL,
  RadixUI,
  React,
  ReactHookForm,
  ReactRouter,
  Redux,
  ReduxSaga,
  ShadcnUI,
  TailwindCSS,
  TailwindUI,
  TanStackTable,
  Tsup,
  TypeScript,
  Vite,
  Zod,
} from './links'

export default function About() {
  return (
    <article className="container prose prose-invert mt-8 lg:prose-xl prose-a:decoration-white prose-a:transition-colors">
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
        This app is made with {TypeScript}, {React}, & {TailwindCSS}, and built
        with {Vite}. The core design is based on {ShadcnUI} & {TailwindUI}. Most
        icons are from {Lucide}, with a few others from {RadixUI}, which is also
        used under-the-hood in a lot of components. State is managed by {Redux},
        with {ReduxSaga} handling side-effects. Tables use {TanStackTable},
        forms use {ReactHookForm} & {Zod}, math rendering uses {KaTeX}, and
        routing is done by {ReactRouter}.
      </p>
      <p>
        The server uses {Node} with {Express}, written in {TypeScript}, and
        built with {Tsup}. It also uses {PostgreSQL} for storage.
      </p>
      <h2>Source Code</h2>
      <p>
        The source code is available{' '}
        <a href="https://github.com/BurnerWah/star-db-project">on GitHub</a>.
      </p>
    </article>
  )
}

// For lazy-loading
export const Component = About
